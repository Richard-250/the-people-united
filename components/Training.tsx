"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { trainingCourses } from "@/data";
import { scrollToSection } from "@/lib/scroll";

const benefits = [
  "Industry-certified instructors with live project experience",
  "Hands-on labs with real engineering workflows",
  "Certificates recognized by employers across East Africa",
  "Flexible schedules: weekday, weekend, and online options",
];

export default function Training() {
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
              Upskill your team or launch your career with intensive courses in
              the tools that power modern civil engineering and architecture —
              from AutoCAD and Civil 3D to ETABS, SAP2000, Revit, and ArchiCAD.
            </p>
            <ul className="mt-8 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                  <span className="font-body text-sm text-offwhite/90">
                    {b}
                  </span>
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
              Request enrollment
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
                className="flex flex-col gap-4 rounded-sm border border-border-subtle bg-bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-display text-xl tracking-widest text-offwhite">
                    {c.name}
                  </h3>
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
                </div>
                <button
                  type="button"
                  onClick={() => scrollToSection("contact")}
                  className="shrink-0 rounded-sm border border-brand-orange px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-widest text-brand-orange transition-colors hover:bg-brand-orange hover:text-charcoal"
                >
                  Enroll now
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="font-body mt-12 text-center text-sm text-text-muted">
          Courses available online and in-person in Kigali.
        </p>
      </div>
    </section>
  );
}
