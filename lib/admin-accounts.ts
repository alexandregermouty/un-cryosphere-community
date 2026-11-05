import { appUrl } from "./base";
// Account tools for the UNESCO Secretariat that need Firebase Authentication admin rights: deleting a member's sign-in
// account and creating a password reset link to share with the member directly.
//
// The Spark plan has no Cloud Functions, so these calls go from the browser to the Identity Toolkit API with a Google
// OAuth access token of the person at the keyboard. Google checks that this Google account has rights on the Firebase
// project (the project owner has them), so the page grants no extra power to anyone else.
// Setup: an OAuth client ID of type "Web application" (see UPDATE_3_21.md), in VITE_GOOGLE_ADMIN_CLIENT_ID or pasted
// once in the dialog, where it is kept in this browser.

const SCOPE = "https://www.googleapis.com/auth/identitytoolkit";
const API = "https://identitytoolkit.googleapis.com/v1";
const CLIENT_KEY = "dacs-admin-oauth-client";
const projectId = () => String(import.meta.env.VITE_FIREBASE_PROJECT_ID || "");

declare global { interface Window { google?: any } }

export function adminClientId(): string {
  const fromBuild = String(import.meta.env.VITE_GOOGLE_ADMIN_CLIENT_ID || "").trim();
  if (fromBuild) return fromBuild;
  try { return localStorage.getItem(CLIENT_KEY) || ""; } catch { return ""; }
}
export function clientIdFromBuild() { return !!String(import.meta.env.VITE_GOOGLE_ADMIN_CLIENT_ID || "").trim(); }
export function saveClientId(id: string) {
  try { if (id.trim()) localStorage.setItem(CLIENT_KEY, id.trim()); else localStorage.removeItem(CLIENT_KEY); } catch { /* storage unavailable */ }
}
export const validClientId = (id: string) => /^[0-9]+-[a-z0-9]+\.apps\.googleusercontent\.com$/.test(id.trim());

let gis: Promise<void> | null = null;
/** Loads Google Identity Services once. Call it early (when the panel opens) so the sign-in pop-up opens on the click. */
export function preloadGoogle(): Promise<void> {
  if (window.google?.accounts?.oauth2) return Promise.resolve();
  if (!gis) gis = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => { gis = null; reject(Error("Google sign-in could not be loaded. Check the connection and try again.")); };
    document.head.appendChild(s);
  });
  return gis;
}

let token: { value: string; until: number } | null = null;
export const googleConnected = () => !!token && token.until > Date.now();
export function disconnectGoogle() {
  if (token && window.google?.accounts?.oauth2) window.google.accounts.oauth2.revoke(token.value, () => {});
  token = null;
}

/**
 * Returns an access token, asking Google for one in a pop-up when needed. Call it directly from a click handler,
 * before any other await, so the browser allows the pop-up.
 */
export function googleToken(): Promise<string> {
  if (token && token.until > Date.now() + 60_000) return Promise.resolve(token.value);
  const clientId = adminClientId();
  if (!clientId) return Promise.reject(Error("Add the Google OAuth client ID first."));
  const oauth = window.google?.accounts?.oauth2;
  if (!oauth) return preloadGoogle().then(() => Promise.reject(Error("Google sign-in is ready. Select the button again.")));
  return new Promise((resolve, reject) => {
    const client = oauth.initTokenClient({
      client_id: clientId,
      scope: SCOPE,
      callback: (r: any) => {
        if (r?.error || !r?.access_token) { reject(Error(r?.error_description || "Google did not grant access.")); return; }
        if (!oauth.hasGrantedAllScopes(r, SCOPE)) { reject(Error("Allow access to Firebase Authentication on the Google screen to use these tools.")); return; }
        token = { value: r.access_token, until: Date.now() + (Number(r.expires_in) || 3600) * 1000 };
        resolve(r.access_token);
      },
      error_callback: (e: any) => reject(Error(e?.type === "popup_closed" ? "The Google window was closed before access was granted." : e?.type === "popup_failed_to_open" ? "The browser blocked the Google window. Allow pop-ups for this site and try again." : "Google sign-in did not complete.")),
    });
    client.requestAccessToken({ prompt: "" });
  });
}

async function call(path: string, body: any, accessToken: string) {
  const res = await fetch(API + path, {
    method: "POST",
    headers: { Authorization: "Bearer " + accessToken, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = String(data?.error?.message || res.status);
    if (res.status === 401) { token = null; throw Error("The Google authorisation has expired. Select the button again to renew it."); }
    if (res.status === 403) throw Error("This Google account has no administrator rights on the Firebase project. Use the Google account that owns the project.");
    if (message.includes("USER_NOT_FOUND") || message.includes("EMAIL_NOT_FOUND")) throw Error("No sign-in account exists for this member. It may already have been deleted.");
    throw Error("Firebase Authentication refused the request (" + message + ").");
  }
  return data;
}

/** The email address of a member's sign-in account. */
export async function accountEmail(uid: string, accessToken: string): Promise<string> {
  const data = await call(`/projects/${projectId()}/accounts:lookup`, { localId: [uid] }, accessToken);
  const email = data?.users?.[0]?.email;
  if (!email) throw Error("No sign-in account with an email address exists for this member.");
  return email;
}

/**
 * Creates a password reset link without sending an email. The link opens the platform's own page
 * (/auth/action on the current domain), so it can be shared by the Secretariat through its usual mailbox.
 */
export async function resetLink(uid: string, accessToken: string): Promise<{ email: string; link: string }> {
  const email = await accountEmail(uid, accessToken);
  const data = await call("/accounts:sendOobCode", { requestType: "PASSWORD_RESET", email, returnOobLink: true, targetProjectId: projectId() }, accessToken);
  const code = data?.oobCode || (data?.oobLink ? new URL(data.oobLink).searchParams.get("oobCode") : "");
  if (!code) throw Error("Firebase Authentication did not return a link.");
  const link = `${appUrl("auth/action")}?mode=resetPassword&oobCode=${encodeURIComponent(code)}`;
  return { email, link };
}

/** Deletes a member's sign-in account (email and password) from Firebase Authentication. */
export async function deleteAccount(uid: string, accessToken: string) {
  await call(`/projects/${projectId()}/accounts:delete`, { localId: uid }, accessToken);
}
