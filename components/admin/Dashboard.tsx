"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Download, Loader2, LogOut, Mail, MessageCircle, Phone, RefreshCw, Search, X } from "lucide-react";
import { getSupabase, type Submission } from "@/lib/supabase";

const STATUSES: Submission["status"][] = ["new", "contacted", "closed"];
const STATUS_STYLE: Record<Submission["status"], string> = {
  new: "bg-km-50 text-km-700 ring-km-100",
  contacted: "bg-amber-50 text-amber-700 ring-amber-100",
  closed: "bg-gray-100 text-gray-600 ring-gray-200",
};

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

export default function Dashboard({ email, onSignOut }: { email: string; onSignOut: () => void }) {
  const [rows, setRows] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Submission["status"]>("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [q, setQ] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const { data, error } = await getSupabase()
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1000);
    if (error) setError(error.message);
    else setRows((data ?? []) as Submission[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function setStatus(id: string, status: Submission["status"]) {
    const prev = rows;
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
    const { error } = await getSupabase().from("contact_submissions").update({ status }).eq("id", id);
    if (error) {
      setRows(prev);
      setError(`Could not update status: ${error.message}`);
    }
  }

  const types = useMemo(() => Array.from(new Set(rows.map((r) => r.enquiry_type))).sort(), [rows]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter(
      (r) =>
        (statusFilter === "all" || r.status === statusFilter) &&
        (typeFilter === "all" || r.enquiry_type === typeFilter) &&
        (!needle ||
          [r.name, r.company, r.email, r.phone, r.country, r.service, r.products, r.quantity, r.message]
            .filter(Boolean)
            .some((v) => v!.toLowerCase().includes(needle)))
    );
  }, [rows, statusFilter, typeFilter, q]);

  const stats = useMemo(() => {
    const weekAgo = Date.now() - 7 * 864e5;
    return {
      total: rows.length,
      fresh: rows.filter((r) => r.status === "new").length,
      week: rows.filter((r) => new Date(r.created_at).getTime() >= weekAgo).length,
      unemailed: rows.filter((r) => r.email_notified === false).length,
    };
  }, [rows]);

  const open = rows.find((r) => r.id === openId) ?? null;
  const closeDetail = useCallback(() => setOpenId(null), []);

  return (
    <div className="min-h-[80vh] bg-gray-50">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-8 lg:px-6">
        {/* Title bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Website enquiries</h1>
            <p className="text-sm text-gray-500">Signed in as {email}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={load} disabled={loading} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-300 disabled:opacity-60">
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
            <button onClick={() => downloadCsv(filtered)} disabled={!filtered.length} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-300 disabled:opacity-60">
              <Download size={15} /> Export CSV
            </button>
            <button onClick={onSignOut} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-300">
              <LogOut size={15} /> Sign out
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat label="Total enquiries" value={stats.total} />
          <Stat label="New (unhandled)" value={stats.fresh} accent />
          <Stat label="Last 7 days" value={stats.week} />
          <Stat label="Email not sent" value={stats.unemailed} hint="Saved here, but FormSubmit email failed" />
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-3 md:flex-row md:items-center">
          <div className="flex flex-wrap gap-1">
            {(["all", ...STATUSES] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition ${
                  statusFilter === s ? "bg-km-600 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm md:w-48">
            <option value="all">All enquiry types</option>
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <label className="relative flex-1">
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name, company, email, message…"
              className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-km-500 focus:ring-4 focus:ring-km-100"
            />
          </label>
        </div>

        {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

        {/* List */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="hidden grid-cols-[150px_1.3fr_1fr_1.4fr_110px] gap-4 border-b border-gray-100 bg-gray-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 md:grid">
            <span>Received</span>
            <span>Name / company</span>
            <span>Enquiry</span>
            <span>Contact</span>
            <span>Status</span>
          </div>
          {loading && !rows.length ? (
            <div className="flex items-center justify-center p-12 text-gray-500">
              <Loader2 className="mr-2 animate-spin" size={18} /> Loading enquiries…
            </div>
          ) : !filtered.length ? (
            <p className="p-12 text-center text-sm text-gray-500">
              {rows.length ? "No enquiries match these filters." : "No enquiries yet."}
            </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {filtered.map((r) => (
                <li key={r.id}>
                  <button
                    onClick={() => setOpenId(r.id)}
                    className="grid w-full gap-1 px-5 py-4 text-left text-sm transition hover:bg-km-50/40 md:grid-cols-[150px_1.3fr_1fr_1.4fr_110px] md:items-center md:gap-4"
                  >
                    <span className="text-xs text-gray-500 md:text-sm">{fmtDate(r.created_at)}</span>
                    <span className="min-w-0">
                      <span className="block truncate font-semibold text-gray-900">{r.name}</span>
                      {r.company && <span className="block truncate text-gray-500">{r.company}</span>}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-gray-800">{r.enquiry_type}</span>
                      {(r.service || r.products) && <span className="block truncate text-gray-500">{r.service || r.products}</span>}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-gray-800">{r.email}</span>
                      <span className="block truncate text-gray-500">{r.phone}{r.country ? ` · ${r.country}` : ""}</span>
                    </span>
                    <span>
                      <StatusBadge status={r.status} />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {rows.length >= 1000 && <p className="mt-2 text-xs text-gray-500">Showing the latest 1,000 enquiries.</p>}
      </div>

      {open && <Detail row={open} onClose={closeDetail} onStatus={(s) => setStatus(open.id, s)} />}
    </div>
  );
}

function Stat({ label, value, accent, hint }: { label: string; value: number; accent?: boolean; hint?: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4" title={hint}>
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className={`mt-1 text-2xl font-bold tabular-nums ${accent ? "text-km-600" : "text-gray-900"}`}>{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: Submission["status"] }) {
  return <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ${STATUS_STYLE[status]}`}>{status}</span>;
}

function Detail({ row, onClose, onStatus }: { row: Submission; onClose: () => void; onStatus: (s: Submission["status"]) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const wa = row.phone.replace(/[^0-9]/g, "");
  const replySubject = encodeURIComponent(`Re: Your enquiry with Khenmarg Logistics`);
  const fields: [string, string | null][] = [
    ["Company", row.company],
    ["Email", row.email],
    ["Phone / WhatsApp", row.phone],
    ["Country", row.country],
    ["Enquiry type", row.enquiry_type],
    ["Service", row.service],
    ["Products", row.products],
    [row.enquiry_type === "Shashva Products" ? "Quantity" : "Cargo details", row.quantity],
    ["Submitted from", row.page_url],
    ["Email notification", row.email_notified === null ? "Unknown" : row.email_notified ? "Sent" : "Not sent"],
  ];

  return (
    <div className="fixed inset-0 z-[70] flex justify-end bg-black/40" onClick={onClose} role="dialog" aria-modal aria-label={`Enquiry from ${row.name}`}>
      <div className="flex h-full w-full max-w-lg flex-col overflow-y-auto bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 p-6">
          <div className="min-w-0">
            <h2 className="truncate text-xl font-bold text-gray-900">{row.name}</h2>
            <p className="text-sm text-gray-500">{fmtDate(row.created_at)}</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Status</p>
            <div className="flex gap-2">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => onStatus(s)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize ring-1 transition ${
                    row.status === s ? "bg-km-600 text-white ring-km-600" : "text-gray-600 ring-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <a href={`mailto:${row.email}?subject=${replySubject}`} className="btn-km !px-4 !py-2 text-sm">
              <Mail size={15} /> Reply by email
            </a>
            {wa.length >= 7 && (
              <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="btn-outline-km !px-4 !py-2 text-sm">
                <MessageCircle size={15} /> WhatsApp
              </a>
            )}
            <a href={`tel:${row.phone.replace(/[^+0-9]/g, "")}`} className="btn-outline-km !px-4 !py-2 text-sm">
              <Phone size={15} /> Call
            </a>
          </div>

          <dl className="divide-y divide-gray-100 rounded-xl border border-gray-200 text-sm">
            {fields
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <div key={k} className="grid grid-cols-[130px_1fr] gap-3 px-4 py-2.5">
                  <dt className="text-gray-500">{k}</dt>
                  <dd className="break-words text-gray-900">{v}</dd>
                </div>
              ))}
          </dl>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Message</p>
            <p className="whitespace-pre-wrap rounded-xl bg-gray-50 p-4 text-sm text-gray-800">{row.message || "—"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function downloadCsv(rows: Submission[]) {
  const cols: (keyof Submission)[] = [
    "created_at", "status", "name", "company", "email", "phone", "country",
    "enquiry_type", "service", "products", "quantity", "message", "email_notified", "page_url",
  ];
  const esc = (v: unknown) => {
    let s = v === null || v === undefined ? "" : String(v);
    if (/^[=+\-@\t\r]/.test(s) && !/^\+[0-9 ()-]+$/.test(s)) s = `'${s}`; // stop spreadsheet formula injection from visitor input
    return `"${s.replace(/"/g, '""')}"`;
  };
  const csv = [cols.join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\r\n");
  const url = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `khenmarg-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
