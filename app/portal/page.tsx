"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Calendar,
  Inbox,
  LogOut,
  Mail,
  Phone,
  GraduationCap,
  Loader2,
  Lock,
} from "lucide-react";
import type { BookingRecord, ContactRecord } from "@/lib/submission-types";
import Link from "next/link";

type Store = { contacts: ContactRecord[]; bookings: BookingRecord[] };

export default function OwnerPortalPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);
  const [data, setData] = useState<Store | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [tab, setTab] = useState<"messages" | "bookings">("messages");

  const loadData = useCallback(async () => {
    setLoadError(null);
    const res = await fetch("/api/portal/submissions", { cache: "no-store" });
    if (res.status === 401) {
      setAuthed(false);
      setData(null);
      return;
    }
    if (!res.ok) {
      setLoadError("Could not load data.");
      setAuthed(false);
      return;
    }
    setAuthed(true);
    setData((await res.json()) as Store);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoginError(null);
    setLoggingIn(true);
    try {
      const res = await fetch("/api/portal/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const j = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setLoginError(j.error || "Login failed");
        return;
      }
      setPassword("");
      await loadData();
    } finally {
      setLoggingIn(false);
    }
  }

  async function logout() {
    await fetch("/api/portal/logout", { method: "POST" });
    setAuthed(false);
    setData(null);
  }

  if (authed === null && !loadError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-brand-orange" />
      </div>
    );
  }

  if (authed === false) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-mirror-panel w-full max-w-md rounded-lg p-8"
        >
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <Lock className="h-7 w-7 text-brand-orange" />
            </div>
            <h1 className="font-display mt-4 text-3xl tracking-widest text-offwhite">
              OWNER PORTAL
            </h1>
            <p className="font-body mt-2 text-sm text-text-muted">
              THE PEOPLE CONSTRUCTION ltd — messages & training bookings
            </p>
          </div>
          <form onSubmit={login} className="space-y-4">
            {loginError && (
              <p className="rounded border border-red-500/30 bg-red-950/40 px-3 py-2 font-body text-sm text-red-200">
                {loginError}
              </p>
            )}
            <div>
              <label
                htmlFor="portal-pw"
                className="font-body text-xs font-semibold uppercase tracking-widest text-text-muted"
              >
                Password
              </label>
              <input
                id="portal-pw"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="font-body mt-2 w-full rounded-md border border-white/10 bg-black/40 px-4 py-3 text-offwhite outline-none ring-brand-orange/30 focus:ring-2"
                disabled={loggingIn}
              />
            </div>
            <button
              type="submit"
              disabled={loggingIn}
              className="font-body flex w-full items-center justify-center gap-2 rounded-md bg-brand-orange py-3 text-sm font-semibold uppercase tracking-wide text-charcoal disabled:opacity-60"
            >
              {loggingIn ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Sign in"
              )}
            </button>
          </form>
          <Link
            href="/"
            className="font-body mt-6 block text-center text-sm text-text-muted hover:text-brand-orange"
          >
            ← Back to website
          </Link>
        </motion.div>
      </div>
    );
  }

  const contacts = data?.contacts ?? [];
  const bookings = data?.bookings ?? [];

  return (
    <div className="min-h-screen px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="bg-mirror-panel mb-8 flex flex-col gap-4 rounded-lg p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Building2 className="h-9 w-9 text-brand-orange" />
            <div>
              <h1 className="font-display text-2xl tracking-widest text-offwhite md:text-3xl">
                OWNER DASHBOARD
              </h1>
              <p className="font-body text-sm text-text-muted">
                Contact messages & course bookings
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => loadData()}
              className="font-body rounded-md border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-offwhite hover:bg-white/5"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={logout}
              className="font-body inline-flex items-center gap-2 rounded-md border border-red-500/30 bg-red-950/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-red-200 hover:bg-red-950/40"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </header>

        {loadError && (
          <p className="mb-4 font-body text-red-300">{loadError}</p>
        )}

        <div className="mb-6 flex gap-2">
          {(
            [
              ["messages", "Messages", Inbox, contacts.length],
              ["bookings", "Bookings", GraduationCap, bookings.length],
            ] as const
          ).map(([key, label, Icon, count]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`font-body flex items-center gap-2 rounded-md px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                tab === key
                  ? "bg-brand-orange text-charcoal"
                  : "border border-white/10 bg-white/5 text-offwhite hover:bg-white/10"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
              <span
                className={`rounded px-1.5 py-0.5 text-[10px] ${
                  tab === key ? "bg-charcoal/20" : "bg-white/10"
                }`}
              >
                {count}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === "messages" ? (
            <motion.div
              key="msg"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              {contacts.length === 0 ? (
                <EmptyCard text="No contact messages yet." />
              ) : (
                contacts.map((c) => (
                  <article
                    key={c.id}
                    className="bg-mirror-panel rounded-lg p-5 md:p-6"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-3">
                      <div>
                        <p className="font-display text-xl tracking-wide text-offwhite">
                          {c.name}
                        </p>
                        <p className="font-body text-sm text-brand-orange">
                          {c.service}
                        </p>
                      </div>
                      <div className="font-body flex flex-col items-end gap-1 text-xs text-text-muted">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(c.createdAt).toLocaleString()}
                        </span>
                        {c.emailed ? (
                          <span className="text-emerald-400/90">Emailed to inbox</span>
                        ) : (
                          <span className="text-amber-400/90">Saved (SMTP off or failed)</span>
                        )}
                      </div>
                    </div>
                    <div className="font-body mt-4 flex flex-wrap gap-4 text-sm">
                      <a
                        href={`mailto:${c.email}`}
                        className="inline-flex items-center gap-1.5 text-offwhite hover:text-brand-orange"
                      >
                        <Mail className="h-4 w-4 shrink-0" />
                        {c.email}
                      </a>
                      <a
                        href={`tel:${c.phone.replace(/\s/g, "")}`}
                        className="inline-flex items-center gap-1.5 text-offwhite hover:text-brand-orange"
                      >
                        <Phone className="h-4 w-4 shrink-0" />
                        {c.phone}
                      </a>
                    </div>
                    <p className="font-body mt-4 whitespace-pre-wrap text-sm leading-relaxed text-offwhite/85">
                      {c.message}
                    </p>
                  </article>
                ))
              )}
            </motion.div>
          ) : (
            <motion.div
              key="book"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              {bookings.length === 0 ? (
                <EmptyCard text="No training bookings recorded yet." />
              ) : (
                bookings.map((b) => (
                  <article
                    key={b.id}
                    className="bg-mirror-panel rounded-lg p-5 md:p-6"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-xl tracking-wide text-offwhite">
                          {b.courseName}
                        </p>
                        <p className="font-body mt-1 text-lg font-semibold text-brand-orange">
                          {b.coursePrice}
                        </p>
                      </div>
                      <span className="font-body inline-flex items-center gap-1 text-xs text-text-muted">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(b.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="font-body mt-4 grid gap-2 text-sm text-offwhite/90 sm:grid-cols-2">
                      <p>
                        <span className="text-text-muted">Name: </span>
                        {b.payerName || "—"}
                      </p>
                      <p>
                        <span className="text-text-muted">Phone: </span>
                        {b.payerPhone || "—"}
                      </p>
                    </div>
                  </article>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <p className="font-body mt-10 text-center text-xs text-text-muted">
          <Link href="/" className="hover:text-brand-orange">
            Return to website
          </Link>
        </p>
      </div>
    </div>
  );
}

function EmptyCard({ text }: { text: string }) {
  return (
    <div className="bg-mirror-panel rounded-lg px-6 py-16 text-center">
      <p className="font-body text-text-muted">{text}</p>
    </div>
  );
}
