"use client";
import { useState } from "react";
import { KeyRound, Loader2, X } from "lucide-react";
import { getSupabase } from "@/lib/supabase";

/** Modal that lets the signed-in admin set a new password after confirming the current one. */
export default function ChangePassword({ email, onClose }: { email: string; onClose: () => void }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (next.length < 6) return setError("New password must be at least 6 characters.");
    if (next !== confirm) return setError("New passwords do not match.");
    setBusy(true);
    const sb = getSupabase();
    // Re-check the current password so an unattended signed-in browser can't be used to take over the account.
    const { error: authError } = await sb.auth.signInWithPassword({ email, password: current });
    if (authError) {
      setBusy(false);
      return setError("Current password is incorrect.");
    }
    const { error: updateError } = await sb.auth.updateUser({ password: next });
    setBusy(false);
    if (updateError) return setError(updateError.message);
    setDone(true);
  }

  const input =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-km-500 focus:ring-4 focus:ring-km-100";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <KeyRound size={18} /> Change password
          </h2>
          <button onClick={onClose} aria-label="Close" className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        {done ? (
          <>
            <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">Password updated. Use it next time you sign in.</p>
            <button onClick={onClose} className="btn-km mt-4 w-full justify-center">Done</button>
          </>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="cp-current" className="mb-1.5 block text-sm font-medium text-gray-700">Current password</label>
              <input id="cp-current" type="password" required autoComplete="current-password" className={input} value={current} onChange={(e) => setCurrent(e.target.value)} />
            </div>
            <div>
              <label htmlFor="cp-new" className="mb-1.5 block text-sm font-medium text-gray-700">New password</label>
              <input id="cp-new" type="password" required autoComplete="new-password" className={input} value={next} onChange={(e) => setNext(e.target.value)} />
            </div>
            <div>
              <label htmlFor="cp-confirm" className="mb-1.5 block text-sm font-medium text-gray-700">Confirm new password</label>
              <input id="cp-confirm" type="password" required autoComplete="new-password" className={input} value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            </div>
            {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <button type="submit" disabled={busy} className="btn-km w-full justify-center disabled:opacity-60">
              {busy ? <><Loader2 size={16} className="animate-spin" /> Saving…</> : "Update password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
