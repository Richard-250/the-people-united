"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { companyInfo, services } from "@/data";

type FormErrors = Partial<Record<"name" | "email" | "phone" | "message", string>>;

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(services[0]?.title ?? "");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [deliveredByEmail, setDeliveredByEmail] = useState<boolean | null>(
    null,
  );

  function validate(): boolean {
    const next: FormErrors = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!email.trim()) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Enter a valid email address.";
    if (!phone.trim()) next.phone = "Please enter your phone number.";
    if (!message.trim()) next.message = "Please tell us how we can help.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          service,
          message: message.trim(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        code?: string;
        emailed?: boolean;
      };
      if (!res.ok) {
        setSubmitError(
          data.error ||
            "Something went wrong. Please try again or email us directly.",
        );
        return;
      }
      setDeliveredByEmail(data.emailed === true);
      setSubmitted(true);
    } catch {
      setSubmitError("Network error. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const mailtoFallback = `mailto:${companyInfo.email}?subject=${encodeURIComponent(`Website enquiry — ${service}`)}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`,
  )}`;

  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-bg-dark py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center"
        >
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
            Get in touch
          </p>
          <h2 className="font-display mt-3 text-5xl tracking-widest text-offwhite md:text-6xl">
            CONTACT
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
          >
            {submitted ? (
              <div className="rounded-sm border border-brand-orange/40 bg-bg-card p-10 text-center">
                <p className="font-body text-lg text-offwhite">
                  Thank you! Your message was received and saved.
                  {deliveredByEmail ? (
                    <>
                      {" "}
                      A copy was also emailed to{" "}
                      <strong className="text-brand-orange">
                        {companyInfo.email}
                      </strong>
                      .
                    </>
                  ) : (
                    <>
                      {" "}
                      (Email forwarding is optional on the server — your message
                      is still stored for our team.)
                    </>
                  )}
                </p>
                <p className="font-body mt-4 text-sm text-text-muted">
                  We&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-sm border border-border-subtle bg-bg-card p-6 md:p-8"
                noValidate
              >
                {submitError && (
                  <div className="rounded-sm border border-red-500/40 bg-red-950/30 p-4 font-body text-sm text-red-200">
                    <p>{submitError}</p>
                    <a
                      href={mailtoFallback}
                      className="mt-2 inline-block font-semibold text-brand-orange underline"
                    >
                      Open email app instead
                    </a>
                  </div>
                )}
                <div>
                  <label
                    htmlFor="fullName"
                    className="font-body text-xs font-semibold uppercase tracking-widest text-text-muted"
                  >
                    Full name
                  </label>
                  <input
                    id="fullName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="font-body mt-2 w-full rounded-sm border border-border-subtle bg-charcoal px-4 py-3 text-offwhite outline-none ring-brand-orange/40 transition-shadow focus:ring-2"
                    autoComplete="name"
                    disabled={submitting}
                  />
                  {errors.name && (
                    <p className="mt-1 font-body text-xs text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="font-body text-xs font-semibold uppercase tracking-widest text-text-muted"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="font-body mt-2 w-full rounded-sm border border-border-subtle bg-charcoal px-4 py-3 text-offwhite outline-none ring-brand-orange/40 transition-shadow focus:ring-2"
                    autoComplete="email"
                    disabled={submitting}
                  />
                  {errors.email && (
                    <p className="mt-1 font-body text-xs text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="font-body text-xs font-semibold uppercase tracking-widest text-text-muted"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="font-body mt-2 w-full rounded-sm border border-border-subtle bg-charcoal px-4 py-3 text-offwhite outline-none ring-brand-orange/40 transition-shadow focus:ring-2"
                    autoComplete="tel"
                    disabled={submitting}
                  />
                  {errors.phone && (
                    <p className="mt-1 font-body text-xs text-red-400">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="service"
                    className="font-body text-xs font-semibold uppercase tracking-widest text-text-muted"
                  >
                    Service
                  </label>
                  <select
                    id="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="font-body mt-2 w-full rounded-sm border border-border-subtle bg-charcoal px-4 py-3 text-offwhite outline-none ring-brand-orange/40 transition-shadow focus:ring-2"
                    disabled={submitting}
                  >
                    {services.map((s) => (
                      <option key={s.title} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="font-body text-xs font-semibold uppercase tracking-widest text-text-muted"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="font-body mt-2 w-full resize-y rounded-sm border border-border-subtle bg-charcoal px-4 py-3 text-offwhite outline-none ring-brand-orange/40 transition-shadow focus:ring-2"
                    disabled={submitting}
                  />
                  {errors.message && (
                    <p className="mt-1 font-body text-xs text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={submitting ? undefined : { scale: 1.02 }}
                  whileTap={submitting ? undefined : { scale: 0.98 }}
                  className="flex w-full items-center justify-center gap-2 rounded-sm bg-brand-orange py-3.5 font-body text-sm font-semibold uppercase tracking-wide text-charcoal disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                  {submitting ? "Sending…" : "Submit"}
                </motion.button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-8"
          >
            <div className="space-y-6 rounded-sm border border-border-subtle bg-bg-card p-6">
              <div className="flex gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand-orange" />
                <div>
                  <p className="font-body text-xs font-semibold uppercase tracking-widest text-text-muted">
                    Address
                  </p>
                  <p className="font-body mt-1 whitespace-pre-line text-offwhite">
                    {companyInfo.address}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-brand-orange" />
                <div>
                  <p className="font-body text-xs font-semibold uppercase tracking-widest text-text-muted">
                    Phone
                  </p>
                  <a
                    href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
                    className="font-body mt-1 block text-offwhite hover:text-brand-orange"
                  >
                    {companyInfo.phone}
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-brand-orange" />
                <div>
                  <p className="font-body text-xs font-semibold uppercase tracking-widest text-text-muted">
                    Email
                  </p>
                  <a
                    href={`mailto:${companyInfo.email}`}
                    className="font-body mt-1 block break-all text-offwhite hover:text-brand-orange"
                  >
                    {companyInfo.email}
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-brand-orange" />
                <div>
                  <p className="font-body text-xs font-semibold uppercase tracking-widest text-text-muted">
                    Hours
                  </p>
                  <p className="font-body mt-1 text-offwhite">
                    {companyInfo.hours}
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-sm border border-border-subtle">
              <iframe
                title="THE PEOPLE CONSTRUCTION ltd — Kabuga, Gasabo, Kigali"
                src={companyInfo.mapEmbedUrl}
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
