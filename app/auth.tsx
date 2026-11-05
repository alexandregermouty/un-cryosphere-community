import { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, configured } from "@/lib/firebase";
import { applyTheme, saveTheme, storedTheme } from "@/lib/theme";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Users, Layers, CalendarDays, Eye, EyeOff, Moon, Sun, LoaderCircle } from "lucide-react";
import { photos } from "@/lib/imagery";
import { PhotoBackdrop } from "./photo";
import { asset } from "@/lib/base";
type AuthContext = {
  user: User | null;
  openSignIn: (mode?: "signin" | "register") => void;
  revision: number;
  initializing: boolean;
};
const Context = createContext<AuthContext>({
  user: null,
  openSignIn: () => {},
  revision: 0,
  initializing: true,
});
export const useMemberAuth = () => useContext(Context);
export function signOutMember() {
  if (auth) void signOut(auth);
}
export function AccountControls() {
  const { user } = useMemberAuth();
  return user ? (
    <div className="account-controls">
      <span title={user.email || ""}>Signed in as {user.email}</span>
      <button className="text-button" onClick={signOutMember}>
        Sign out
      </button>
    </div>
  ) : null;
}
function authMessage(e: any) {
  const code = String(e.code || "");
  return code.includes("invalid-credential")
    ? "Email or password could not be verified."
    : code.includes("operation-not-allowed")
      ? "This sign-in method is not enabled yet."
      : code.includes("unauthorized-domain")
        ? `Sign-in is not yet enabled for ${window.location.hostname}. The UNESCO Secretariat must add this address to the authorised domains of Firebase Authentication. In the meantime, sign in at https://${import.meta.env.VITE_FIREBASE_PROJECT_ID || "cryohub-eb898"}.web.app.`
        : code.includes("email-already-in-use")
          ? "An account already uses this email. Sign in or reset your password."
          : e.message || "Sign-in failed.";
}
/** Email, password and Google sign-in. Used on the landing page, the poll invitation page and the sign-in dialog. */
export function AuthForm({
  mode,
  onModeChange,
  onDone,
  registeredMessage = "Account created. Complete your profile to join the community.",
}: {
  mode: string;
  onModeChange: (mode: string) => void;
  onDone?: () => void;
  registeredMessage?: string;
}) {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [showPassword, setShowPassword] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  async function perform(run: () => Promise<any>) {
    setBusy(true);
    setError("");
    try {
      await run();
    } catch (e: any) {
      setError(authMessage(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <Tabs
        className="tabs-surface wide"
        value={mode}
        onValueChange={(m) => {
          onModeChange(m);
          setError("");
        }}
      >
        <TabsList>
          <TabsTrigger value="signin">Sign in</TabsTrigger>
          <TabsTrigger value="register">Create account</TabsTrigger>
        </TabsList>
      </Tabs>
      <form
        className="auth-form"
        onSubmit={(e) => {
          e.preventDefault();
          perform(async () => {
            if (mode === "register") {
              await createUserWithEmailAndPassword(auth!, email, password);
              toast.success(registeredMessage);
            } else await signInWithEmailAndPassword(auth!, email, password);
            setPassword("");
            onDone?.();
          });
        }}
      >
        <div className="field">
          <label htmlFor="auth-email">Email address</label>
          <input
            id="auth-email"
            type="email"
            autoComplete="email"
            placeholder="name@organisation.org"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="auth-password">Password</label>
          <div className="password-wrap">
            <input
              id="auth-password"
              type={showPassword ? "text" : "password"}
              minLength={8}
              autoComplete={mode === "register" ? "new-password" : "current-password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          {mode === "register" && <small>At least eight characters.</small>}
        </div>
        {mode === "signin" && (
          <button
            type="button"
            className="text-button forgot"
            disabled={busy}
            onClick={() =>
              perform(async () => {
                if (!email.trim()) throw Error("Enter your email address first.");
                await sendPasswordResetEmail(auth!, email);
                toast.success("If an account exists, a reset link will be sent.");
              })
            }
          >
            Forgot your password?
          </button>
        )}
        {error && (
          <p className="error-banner" role="alert">
            {error}
          </p>
        )}
        <button className="btn primary" disabled={busy}>
          {busy && <LoaderCircle size={17} className="spinner" />}
          {busy ? "Please wait…" : mode === "register" ? "Create account" : "Sign in"}
        </button>
        <div className="entry-divider">or</div>
        <button
          type="button"
          className="btn wide"
          disabled={busy}
          onClick={() =>
            perform(async () => {
              await signInWithPopup(auth!, new GoogleAuthProvider());
              onDone?.();
            })
          }
        >
          Continue with Google
        </button>
      </form>
    </>
  );
}
export function ThemeSwitch() {
  const [dark, setDark] = useState(() => storedTheme() === "dark");
  return (
    <button
      type="button"
      onClick={() => {
        saveTheme(dark ? "light" : "dark");
        setDark(!dark);
      }}
    >
      {dark ? <Sun size={14} /> : <Moon size={14} />}
      {dark ? "Light mode" : "Dark mode"}
    </button>
  );
}
export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, initializing } = useMemberAuth();
  const [mode, setMode] = useState("signin");
  if (initializing)
    return (
      <main className="entry-loading" role="status">
        <img className="logo-light" src={asset("/assets/decade-logo-color.webp")} alt="" />
        <img className="logo-dark" src={asset("/assets/decade-logo-white.webp")} alt="" />
        <span className="loader-bar" />
        <span className="sr-only">Loading your account…</span>
      </main>
    );
  if (!user)
    return (
      <main className="entry-shell">
        <section className="entry-visual has-photo" aria-label="About DACS Community">
          <PhotoBackdrop photo={photos.icebergSky} eager sizes="(max-width: 860px) 100vw, 55vw" />
          <img
            className="entry-logo"
            src={asset("/assets/decade-logo-white.webp")}
            alt="Decade of Action for Cryospheric Sciences 2025–2034"
          />
          <div className="entry-copy">
            <div className="eyebrow">People. Science. Action.</div>
            <h1>The member platform of the Decade of Action for Cryospheric Sciences</h1>
            <p>
              Join the people contributing to the Decade. Sign in or create an account to access
              member profiles, Working Groups and contribution opportunities.
            </p>
            <ul className="entry-features">
              <li><Users />Member directory and expertise matching</li>
              <li><Layers />Five Working Groups, activities and contributions</li>
              <li><CalendarDays />Decade calendar, meeting polls and news</li>
            </ul>
          </div>
          <div className="entry-visual-foot">
            <img src={asset("/assets/unesco-logo-white.webp")} alt="UNESCO" />
            <span>Secretariat hosted by UNESCO–IHP</span>
          </div>
        </section>
        <section className="entry-panel">
          <div className="entry-card">
            <div>
              <div className="eyebrow">DACS Community</div>
              <h2 style={{ marginTop: 6 }}>{mode === "register" ? "Create your account" : "Sign in to your account"}</h2>
              <p className="lead">
                {mode === "register"
                  ? "Create an account, then complete your member profile in five short steps."
                  : "Use your email account or Google to access the community."}
              </p>
            </div>
            {configured ? (
              <AuthForm mode={mode} onModeChange={setMode} />
            ) : (
              <div className="error-banner">
                Member registration is unavailable until the Firebase web settings are configured.
              </div>
            )}
            <p className="auth-help">
              If you encounter any problem, please contact the UNESCO Secretariat by email at{" "}
              <a href="mailto:cryosphere@unesco.org">cryosphere@unesco.org</a>.
            </p>
            <div className="entry-foot">
              <span>UNESCO–IHP · 2025–2034</span>
              <ThemeSwitch />
            </div>
          </div>
        </section>
      </main>
    );
  return <>{children}</>;
}
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [revision, setRevision] = useState(0),
    [user, setUser] = useState<User | null>(null),
    [initializing, setInitializing] = useState(true),
    [open, setOpen] = useState(false),
    [mode, setMode] = useState("signin");
  useEffect(() => {
    applyTheme(storedTheme());
    if (!auth) {
      setInitializing(false);
      return;
    }
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setInitializing(false);
    });
  }, []);
  useEffect(() => {
    const refresh = () => {
      setUser(auth?.currentUser || null);
      setRevision((v) => v + 1);
    };
    window.addEventListener("dacs-auth-refresh", refresh);
    return () => window.removeEventListener("dacs-auth-refresh", refresh);
  }, []);
  return (
    <Context.Provider
      value={{
        user,
        revision,
        initializing,
        openSignIn: (m = "signin") => {
          setMode(m);
          setOpen(true);
        },
      }}
    >
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="detail-content auth-dialog">
          <DialogTitle>Join DACS Community</DialogTitle>
          <DialogDescription>
            Use your email account to create a profile and contribute to the Decade.
          </DialogDescription>
          {!configured ? (
            <p>Registration will be available once the Firebase project is connected.</p>
          ) : (
            <AuthForm mode={mode} onModeChange={setMode} onDone={() => setOpen(false)} />
          )}
        </DialogContent>
      </Dialog>
    </Context.Provider>
  );
}
