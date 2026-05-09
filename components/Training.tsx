"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Download, X } from "lucide-react";
import { companyInfo, trainingCourses } from "@/data";
import { scrollToSection } from "@/lib/scroll";

const benefits = [
  "Instructors with live site and design-office experience",
  "Course PDFs mirror real project deliverables (CSI SAFE, ETABS, SAP2000, AutoCAD, Lumion)",
  "Certificates and schedules coordinated after payment confirmation",
  "Weekday, weekend, and online options available",
];

type Course = (typeof trainingCourses)[number];

function buildPaymentEmail(course: Course, fullName: string, phone: string) {
  const subject = `Training payment — ${course.name}`;
  const body = `Hello ${companyInfo.name},

I am booking the following course:
Course: ${course.name}
Fee: ${course.price}

My full name: ${fullName || "(please add)"}
My phone: ${phone || "(please add)"}

I have sent the course fee via MTN MoMo / Airtel Money to ${companyInfo.phoneLocal}.
Please find my payment screenshot attached to this email.

Thank you.`;
  return `mailto:${companyInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function Training() {
  const [bookingCourse, setBookingCourse] = useState<Course | null>(null);
  const [payerName, setPayerName] = useState("");
  const [payerPhone, setPayerPhone] = useState("");
  const [bookingSaving, setBookingSaving] = useState(false);

  const mailtoHref = useMemo(() => {
    if (!bookingCourse) return "";
    return buildPaymentEmail(bookingCourse, payerName.trim(), payerPhone.trim());
  }, [bookingCourse, payerName, payerPhone]);

  async function recordBookingAndOpenMail() {
    if (!bookingCourse || !mailtoHref) return;
    setBookingSaving(true);
    try {
      await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseName: bookingCourse.name,
          coursePrice: bookingCourse.price,
          payerName: payerName.trim(),
          payerPhone: payerPhone.trim(),
        }),
      });
    } catch {
      /* still open mailto */
    } finally {
      setBookingSaving(false);
    }
    window.location.href = mailtoHref;
  }

  return (
    <section
      id="training"
      className="scroll-mt-24 border-y border-brand-orange/25 bg-bg-dark-2 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
              Professional development
            </p>
            <h2 className="font-display mt-3 text-5xl tracking-widest text-offwhite md:text-6xl">
              SOFTWARE TRAINING
            </h2>
            <p className="font-body mt-6 text-base leading-relaxed text-text-muted md:text-lg">
              Each course is paired with a downloadable PDF portfolio (CSI SAFE,
              ETABS, SAP2000, AutoCAD, Lumion) — the same material we use to
              train engineers and technicians on real workflows.
            </p>
            <ul className="mt-8 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                  <span className="font-body text-sm text-offwhite/90">{b}</span>
                </li>
              ))}
            </ul>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection("contact")}
              className="mt-10 rounded-sm bg-brand-orange px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wide text-charcoal"
            >
              General enquiry
            </motion.button>
          </motion.div>

          <div className="space-y-4">
            {trainingCourses.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05, duration: 0.45 }}
                className="flex flex-col gap-4 rounded-sm border border-border-subtle bg-bg-card p-5 sm:flex-row sm:items-stretch sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-xl tracking-widest text-offwhite">
                    {c.name}
                  </h3>
                  <p className="font-body mt-2 text-sm text-text-muted">
                    {c.blurb}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="font-body text-xs text-text-muted">
                      {c.duration}
                    </span>
                    <span className="rounded-sm bg-steel/30 px-2 py-0.5 font-body text-[10px] font-bold uppercase tracking-wide text-offwhite">
                      {c.level}
                    </span>
                  </div>
                  <p className="font-body mt-2 text-sm font-semibold text-brand-orange">
                    {c.price}
                  </p>
                  <a
                    href={c.pdfFile}
                    download
                    className="font-body mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-offwhite/80 underline-offset-4 hover:text-brand-orange hover:underline"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download course PDF
                  </a>
                </div>
                <div className="flex shrink-0 flex-col justify-center gap-2 sm:w-40">
                  <button
                    type="button"
                    onClick={() => {
                      setBookingCourse(c);
                      setPayerName("");
                      setPayerPhone("");
                    }}
                    className="rounded-sm bg-brand-orange px-4 py-2.5 font-body text-xs font-semibold uppercase tracking-widest text-charcoal transition-opacity hover:opacity-90"
                  >
                    Book &amp; pay
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection("contact")}
                    className="rounded-sm border border-border-subtle px-4 py-2.5 font-body text-xs font-semibold uppercase tracking-widest text-offwhite/90 transition-colors hover:border-brand-orange/50"
                  >
                    Ask a question
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="font-body mt-12 text-center text-sm text-text-muted">
          Enrollment is confirmed after we receive your payment screenshot at{" "}
          <a
            href={`mailto:${companyInfo.email}`}
            className="text-brand-orange hover:underline"
          >
            {companyInfo.email}
          </a>
          . Courses run in Kigali and online.
        </p>
      </div>

      <AnimatePresence>
        {bookingCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end justify-center bg-charcoal/80 p-4 backdrop-blur-sm sm:items-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            onClick={() => setBookingCourse(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-sm border border-brand-orange/30 bg-bg-card p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <h3
                  id="booking-title"
                  className="font-display text-2xl tracking-widest text-offwhite"
                >
                  Book &amp; pay
                </h3>
                <button
                  type="button"
                  onClick={() => setBookingCourse(null)}
                  className="rounded-sm p-1 text-offwhite/70 hover:bg-charcoal hover:text-offwhite"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="font-body mt-2 text-sm text-text-muted">
                <strong className="text-offwhite">{bookingCourse.name}</strong> —{" "}
                {bookingCourse.price}
              </p>

              <ol className="font-body mt-6 list-decimal space-y-3 pl-5 text-sm text-offwhite/90">
                <li>
                  Pay the course fee using{" "}
                  <strong>MTN MoMo</strong> or <strong>Airtel Money</strong> to{" "}
                  <strong className="text-brand-orange">
                    {companyInfo.phoneLocal}
                  </strong>{" "}
                  (same number as our business line).
                </li>
                <li>
                  Take a screenshot of the successful transaction from your phone.
                </li>
                <li>
                  Email the screenshot to{" "}
                  <a
                    href={`mailto:${companyInfo.email}`}
                    className="text-brand-orange hover:underline"
                  >
                    {companyInfo.email}
                  </a>{" "}
                  so we can confirm your seat.
                </li>
              </ol>

              <div className="mt-6 space-y-3">
                <div>
                  <label
                    htmlFor="payer-name"
                    className="font-body text-xs font-semibold uppercase tracking-widest text-text-muted"
                  >
                    Your full name
                  </label>
                  <input
                    id="payer-name"
                    value={payerName}
                    onChange={(e) => setPayerName(e.target.value)}
                    className="font-body mt-2 w-full rounded-sm border border-border-subtle bg-charcoal px-3 py-2.5 text-offwhite outline-none ring-brand-orange/40 focus:ring-2"
                    autoComplete="name"
                    placeholder="As it should appear on your certificate"
                  />
                </div>
                <div>
                  <label
                    htmlFor="payer-phone"
                    className="font-body text-xs font-semibold uppercase tracking-widest text-text-muted"
                  >
                    Your phone (for follow-up)
                  </label>
                  <input
                    id="payer-phone"
                    value={payerPhone}
                    onChange={(e) => setPayerPhone(e.target.value)}
                    className="font-body mt-2 w-full rounded-sm border border-border-subtle bg-charcoal px-3 py-2.5 text-offwhite outline-none ring-brand-orange/40 focus:ring-2"
                    autoComplete="tel"
                    placeholder="07…"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={recordBookingAndOpenMail}
                disabled={bookingSaving || !mailtoHref}
                className="font-body mt-6 flex w-full items-center justify-center rounded-sm bg-brand-orange py-3.5 text-center text-sm font-semibold uppercase tracking-wide text-charcoal transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {bookingSaving ? "Saving…" : "Open email to send payment proof"}
              </button>
              <p className="font-body mt-3 text-center text-[11px] leading-relaxed text-text-muted">
                This opens your mail app with a pre-filled message. Attach your
                payment screenshot before sending.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
