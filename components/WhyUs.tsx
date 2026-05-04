"use client";

import { motion } from "framer-motion";
import { whyUs } from "@/data";
import WhyUsIcon from "@/components/WhyUsIcon";

const accent = ["#FF6B35", "#2E86AB", "#C9A84C"];

export default function WhyUs() {
  return (
    <section
      className="relative scroll-mt-24 bg-bg-dark-2 py-24 md:py-32"
      style={{
        clipPath: "polygon(0 3%, 100% 0, 100% 97%, 0 100%)",
      }}
    >
      <div className="bg-grid-pattern pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center"
        >
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
            Why choose us
          </p>
          <h2 className="font-display mt-3 text-5xl tracking-widest text-offwhite md:text-6xl">
            BUILT ON TRUST
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.45 }}
              className="rounded-sm border border-border-subtle bg-bg-card/80 p-6 backdrop-blur-sm"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: accent[i % accent.length] }}
              >
                <WhyUsIcon name={w.icon} className="h-6 w-6" />
              </div>
              <h3 className="font-body mt-4 text-lg font-bold text-offwhite">
                {w.title}
              </h3>
              <p className="font-body mt-2 text-sm leading-relaxed text-text-muted">
                {w.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.blockquote
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="font-display mx-auto mt-16 max-w-3xl text-center text-2xl italic tracking-wide text-brand-orange md:text-3xl"
        >
          &ldquo;We don&apos;t just build structures — we build trust.&rdquo;
        </motion.blockquote>
      </div>
    </section>
  );
}
