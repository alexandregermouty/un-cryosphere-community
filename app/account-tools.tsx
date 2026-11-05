import { useEffect, useState } from "react";
import { Check, Copy, ExternalLink, KeyRound, Link2, Loader2, Mail, Send, ShieldCheck, Trash2, UserX } from "lucide-react";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { auth } from "@/lib/firebase";
import { adminClientId, clientIdFromBuild, deleteAccount, googleConnected, googleToken, preloadGoogle, resetLink, saveClientId, validClientId } from "@/lib/admin-accounts";
import { MemberAvatar } from "./member-avatar";
import { appUrl } from "@/lib/base";

const SETUP_HELP = "The Google tools need an OAuth client ID of the Firebase project. The steps are in UPDATE_3_21.md.";

/** Field to record the Google OAuth client ID in this browser, when the build does not include one. */
function ClientIdField({ onSaved }: { onSaved: () => void }) {
  const [value, setValue] = useState(adminClientId());
  const ok = validClientId(value);
  return (
    <div className="account-setup">
      <p className="micro">{SETUP_HELP}</p>
      <label className="action-field">
        <span>Google OAuth client ID</span>
        <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="123456789012-abc….apps.googleusercontent.com" spellCheck={false} />
      </label>
      <button type="button" className="btn small" disabled={!ok} onClick={() => { saveClientId(value); void preloadGoogle().catch(() => {}); onSaved(); toast.success("Client ID saved in this browser."); }}>
        <Check size={14} /> Save the client ID
      </button>
    </div>
  );
}

/** Creates a password reset link for one member, to share from the Secretariat's own mailbox. */
export function ResetPasswordDialog({ member, onClose }: { member: any | null; onClose: () => void }) {
  const [result, setResult] = useState<{ email: string; link: string } | null>(null);
  const [busy, setBusy] = useState(false), [error, setError] = useState(""), [configured, setConfigured] = useState(!!adminClientId());
  const [fallbackEmail, setFallbackEmail] = useState(""), [sent, setSent] = useState(false);
  useEffect(() => { setResult(null); setError(""); setSent(false); setFallbackEmail(""); if (member && adminClientId()) void preloadGoogle().catch(() => {}); }, [member?.id]);
  function create() {
    setError("");
    // The Google pop-up must open within the click, so the token is requested before any other await.
    const pending = googleToken();
    setBusy(true);
    pending.then((t) => resetLink(member.id, t)).then(setResult).catch((e) => setError(e.message)).finally(() => setBusy(false));
  }
  async function copy() {
    try { await navigator.clipboard.writeText(result!.link); toast.success("Link copied."); } catch { toast.info(result!.link); }
  }
  const first = String(member?.name || "").split(" ")[0] || "colleague";
  const mail = result ? `mailto:${encodeURIComponent(result.email)}?subject=${encodeURIComponent("Your DACS Community password")}&body=${encodeURIComponent(
    `Dear ${first},\n\nAs requested, here is a link to choose a new password for DACS Community:\n\n${result.link}\n\nThe link can be used once and expires after a short time. If it no longer works, please let us know and we will send a new one.\n\nWith best regards,\nUNESCO Secretariat of the Decade of Action for Cryospheric Sciences`)}` : "";
  return (
    <Dialog open={!!member} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="detail-content account-dialog">
        <DialogTitle><KeyRound size={19} /> Reset the password</DialogTitle>
        <DialogDescription>Create a link that lets {member?.name || "this member"} choose a new password, and send it yourself, so it does not land in a spam folder.</DialogDescription>
        {member && <div className="account-person"><MemberAvatar name={member.name} uid={member.id} hasPhoto={member.hasPhoto} version={member.updatedAt} /><span><strong>{member.name}</strong><small>{member.headline}</small></span></div>}
        {!configured ? <ClientIdField onSaved={() => setConfigured(true)} /> : !result ? (
          <div className="account-step">
            <p>Select the button and sign in with the Google account that owns the Firebase project. Google asks once per session for access to Firebase Authentication. No email is sent to the member.</p>
            <button type="button" className="btn primary" disabled={busy} onClick={create}>
              {busy ? <><Loader2 size={16} className="spin" /> Creating the link…</> : <><Link2 size={16} /> Create the reset link</>}
            </button>
            {googleConnected() && <p className="micro"><ShieldCheck size={13} /> Connected to Google for this session.</p>}
          </div>
        ) : (
          <div className="account-step done">
            <p>Link created for <strong>{result.email}</strong>. It opens the DACS Community page for choosing a new password. It works once and expires after a short time, so send it now.</p>
            <div className="link-box"><input readOnly value={result.link} onFocus={(e) => e.currentTarget.select()} aria-label="Password reset link" /><button type="button" className="btn small" onClick={copy}><Copy size={14} /> Copy</button></div>
            <div className="toolbar">
              <a className="btn primary" href={mail}><Mail size={16} /> Write the email</a>
              <button type="button" className="btn" onClick={() => setResult(null)}>Create a new link</button>
            </div>
          </div>
        )}
        {error && <p role="alert" className="error-banner">{error}</p>}
        <details className="account-fallback">
          <summary>Send the automatic reset email instead</summary>
          <p className="micro">Firebase sends its standard email. It may arrive in the spam folder until the sender domain is set up (see UPDATE_3_20.md).</p>
          <div className="link-box">
            <input type="email" value={fallbackEmail} onChange={(e) => setFallbackEmail(e.target.value)} placeholder="Member's email address" aria-label="Member's email address" />
            <button type="button" className="btn small" disabled={!/^[^@\s]+@[^@\s]+$/.test(fallbackEmail) || sent} onClick={async () => {
              try { await sendPasswordResetEmail(auth!, fallbackEmail.trim(), { url: appUrl() }); setSent(true); toast.success("Reset email sent."); }
              catch (e: any) { setError(e?.code === "auth/user-not-found" ? "No account uses this email address." : "The email could not be sent. Check the address and try again."); }
            }}>{sent ? <><Check size={14} /> Sent</> : <><Send size={14} /> Send</>}</button>
          </div>
        </details>
        {configured && !clientIdFromBuild() && <button type="button" className="text-button micro" onClick={() => { saveClientId(""); setConfigured(false); }}>Change the Google OAuth client ID</button>}
      </DialogContent>
    </Dialog>
  );
}

/** Removes a member's data and, if chosen, their sign-in account in Firebase Authentication. */
export function RemoveMemberDialog({ member, onClose, removeData }: { member: any | null; onClose: () => void; removeData: (m: any) => Promise<boolean> }) {
  const [configured, setConfigured] = useState(!!adminClientId());
  const [withAccount, setWithAccount] = useState(true), [busy, setBusy] = useState(false), [error, setError] = useState(""), [typed, setTyped] = useState("");
  useEffect(() => { setError(""); setTyped(""); setBusy(false); setConfigured(!!adminClientId()); if (member && adminClientId()) void preloadGoogle().catch(() => {}); }, [member?.id]);
  const deleteSignIn = configured && withAccount;
  const confirmed = typed.trim().toLowerCase() === "remove";
  function run() {
    setError("");
    // Ask Google first, within the click; the data is removed only once access is granted.
    const token = deleteSignIn ? googleToken() : Promise.resolve("");
    setBusy(true);
    token.then(async (t) => {
      const removed = await removeData(member);
      if (!removed) return;
      if (deleteSignIn) {
        try { await deleteAccount(member.id, t); toast.success(`${member.name}'s sign-in account has been deleted.`); }
        catch (e: any) { toast.error(`The data was removed, but the sign-in account was not deleted: ${e.message}`); }
      }
      onClose();
    }).catch((e) => setError(e.message)).finally(() => setBusy(false));
  }
  return (
    <Dialog open={!!member} onOpenChange={(v) => !v && !busy && onClose()}>
      <DialogContent className="detail-content account-dialog account-danger">
        <DialogTitle><UserX size={19} /> Remove a member</DialogTitle>
        <DialogDescription>This cannot be undone.</DialogDescription>
        {member && <div className="account-person"><MemberAvatar name={member.name} uid={member.id} hasPhoto={member.hasPhoto} version={member.updatedAt} /><span><strong>{member.name}</strong><small>{member.headline}</small></span></div>}
        <ul className="account-list">
          <li>The profile, the private profile answers, the role and badges, the role declaration and the preferences are deleted.</li>
          <li>The member's news, events and contributions are deleted, and the member leaves every mailing list.</li>
          <li>Messages already sent stay in the conversations of the other members.</li>
        </ul>
        {configured ? (
          <label className="checkline account-check">
            <input type="checkbox" checked={withAccount} onChange={(e) => setWithAccount(e.target.checked)} />
            <span><strong>Also delete the sign-in account</strong> (email address and password) from Firebase Authentication. Without this, the person can sign in again and create a new profile.</span>
          </label>
        ) : (
          <details className="account-fallback">
            <summary>Also delete the sign-in account from Firebase Authentication</summary>
            <ClientIdField onSaved={() => setConfigured(true)} />
            <p className="micro">You can also delete the account by hand: Firebase console → Authentication → Users → the member's row → Delete account.</p>
          </details>
        )}
        <label className="action-field">
          <span>Type <strong>remove</strong> to confirm</span>
          <input value={typed} onChange={(e) => setTyped(e.target.value)} autoComplete="off" />
        </label>
        {error && <p role="alert" className="error-banner">{error}</p>}
        <div className="toolbar account-actions">
          <button type="button" className="btn" onClick={onClose} disabled={busy}>Cancel</button>
          <button type="button" className="btn danger" disabled={!confirmed || busy} onClick={run}>
            {busy ? <><Loader2 size={16} className="spin" /> Removing…</> : <><Trash2 size={16} /> {deleteSignIn ? "Remove the member and the account" : "Remove the member data"}</>}
          </button>
        </div>
        <a className="micro account-console" href={`https://console.firebase.google.com/project/${import.meta.env.VITE_FIREBASE_PROJECT_ID || "_"}/authentication/users`} target="_blank" rel="noopener noreferrer">Open Firebase Authentication users <ExternalLink size={12} /></a>
      </DialogContent>
    </Dialog>
  );
}
