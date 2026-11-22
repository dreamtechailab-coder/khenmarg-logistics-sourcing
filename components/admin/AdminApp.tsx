"use client";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { Loader2, Lock, LogOut, ShieldAlert } from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import Dashboard from "./Dashboard";

type Phase = "loading" | "signed-out" | "checking" | "denied" | "ready";

export default function AdminApp() {
  const [phase, setPhase] = useState<Phase>("loading");
  // undefined = still restoring the saved session, null = signed out
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    const sb = getSupabase();
    sb.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = sb.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const userId = session?.user.id;

  // Whenever the signed-in user changes, confirm they are on the admin allow-list.
  useEffect(() => {
    if (session === undefined) return;
    if (!userId) {
      setPhase("signed-out");
      return;
    }
    let cancelled = false;
    setPhase("checking");
    getSupabase()
      .rpc("is_admin")
      .then(({ data, error }) => {
        if (!cancelled) setPhase(!error && data === true ? "ready" : "denied");
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-check only when the user changes, not on token refresh
  }, [userId, session === undefined]);

  const signOut = () => getSupabase().auth.signOut();

  if (phase === "loading" || phase === "checking") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-gray-500">
        <Loader2 className="mr-2 animate-spin" size={20} /> Loading…
      </div>
    );
  }

  if (phase === "signed-out") return <LoginForm />;

  if (phase === "denied") {
    return (
      <Centered>
        <ShieldAlert className="mx-auto mb-3 text-km-600" size={40} />
        <h1 className="text-xl font-bold">No admin access</h1>
        <p className="mt-2 text-sm text-gray-600">
          {session?.user.email} is signed in but is not an administrator for this site.
        </p>
        <button onClick={signOut} className="btn-outline-km mt-6">
          <LogOut size={16} /> Sign out
        </button>
      </Centered>
    );
  }

  return <Dashboard email={session?.user.email ?? ""} onSignOut={signOut} />;
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">{children}</div>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { error } = await getSupabase().auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) setError(error.message === "Invalid login credentials" ? "Incorrect email or password." : error.message);
  }

  const input =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-km-500 focus:ring-4 focus:ring-km-100";

  return (
    <Centered>
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-km-50 text-km-600">
        <Lock size={22} />
      </div>
      <h1 className="text-xl font-bold">Admin login</h1>
      <p className="mt-1 text-sm text-gray-500">Sign in to view website enquiries.</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4 text-left">
        <div>
          <label htmlFor="admin-email" className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
          <input id="admin-email" type="email" required autoComplete="username" className={input} value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="admin-password" className="mb-1.5 block text-sm font-medium text-gray-700">Password</label>
          <input id="admin-password" type="password" required autoComplete="current-password" className={input} value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <button type="submit" disabled={busy} className="btn-km w-full justify-center disabled:opacity-60">
          {busy ? <><Loader2 size={16} className="animate-spin" /> Signing in…</> : "Sign in"}
        </button>
      </form>
    </Centered>
  );
}
