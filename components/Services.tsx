"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/data";
import ServiceIcon from "@/components/ServiceIcon";
import { scrollToSection } from "@/lib/scroll";

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Services() {
  return (
    <section
      id="services"
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
            What we do
          </p>
          <h2 className="font-display mt-3 text-5xl tracking-widest text-offwhite md:text-6xl">
            OUR SERVICES
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-sm border border-border-subtle bg-bg-card p-6 shadow-lg transition-shadow duration-300 hover:border-brand-orange/40 hover:shadow-[0_0_40px_-10px_rgba(255,107,53,0.35)]"
            >
              <div
                className="absolute left-0 right-0 top-0 h-1 origin-left scale-x-0 bg-brand-orange transition-transform duration-300 group-hover:scale-x-100"
                aria-hidden
              />
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-md"
                style={{ backgroundColor: s.color }}
              >
                <ServiceIcon name={s.icon} className="h-7 w-7" />
              </div>
              <h3 className="font-display mt-5 text-xl tracking-widest text-offwhite">
                {s.title}
              </h3>
              <p className="font-body mt-3 text-sm leading-relaxed text-text-muted">
                {s.description}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <button
            type="button"
            onClick={() => scrollToSection("contact")}
            className="group inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-widest text-brand-orange transition-colors hover:text-offwhite"
          >
            Need a custom solution? Contact us
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
