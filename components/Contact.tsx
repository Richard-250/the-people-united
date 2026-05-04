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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  }

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
                  Thank you! We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-sm border border-border-subtle bg-bg-card p-6 md:p-8"
                noValidate
              >
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
                  />
                  {errors.message && (
                    <p className="mt-1 font-body text-xs text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center gap-2 rounded-sm bg-brand-orange py-3.5 font-body text-sm font-semibold uppercase tracking-wide text-charcoal"
                >
                  <Send className="h-4 w-4" />
                  Submit
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
                  <p className="font-body mt-1 text-offwhite">
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
                title="The People United Ltd location map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127672.47617207376!2d29.938288349999997!3d-1.9440727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca4a9455ce6f7%3A0x82fad09c87b17cf6!2sKigali!5e0!3m2!1sen!2srw!4v1715000000000!5m2!1sen!2srw"
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
