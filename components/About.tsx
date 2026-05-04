"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { companyInfo } from "@/data";

const milestones = [
  { year: "2020", text: "Founded" },
  { year: "2021", text: "First Major Contract" },
  { year: "2022", text: "Regional Expansion" },
  { year: "2023", text: "100+ Clients" },
  { year: "2024", text: "Award Recognition" },
  { year: "2025", text: "Growing" },
];

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 bg-bg-dark py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm border-2 border-brand-orange/40 shadow-xl shadow-black/50">
              <Image
                src="https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&q=80"
                alt="Engineering team at work"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="absolute -bottom-4 -right-4 rounded-sm border border-brand-orange/50 bg-bg-card px-4 py-2 shadow-lg"
            >
              <span className="font-display text-lg tracking-widest text-brand-orange">
                Since {companyInfo.founded}
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
          >
            <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
              About us
            </p>
            <h2 className="font-display mt-3 text-5xl tracking-widest text-offwhite md:text-6xl">
              PRECISION ENGINEERING IN THE HEART OF KIGALI
            </h2>
            <p className="font-body mt-6 text-base leading-relaxed text-text-muted md:text-lg">
              {companyInfo.name} is a multidisciplinary construction and
              engineering firm delivering structural design, architecture,
              surveying, and consultancy across Rwanda and the wider East
              African region. We combine international standards with local
              insight — so every structure we touch is safe, efficient, and
              built for generations.
            </p>
            <p className="font-body mt-4 text-base leading-relaxed text-text-muted md:text-lg">
              Our team of licensed engineers, architects, and surveyors partners
              with developers, institutions, and homeowners from first sketch
              to final handover — including professional software training that
              strengthens Rwanda&apos;s technical workforce.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-16 border-t border-border-subtle pt-12"
        >
          <h3 className="font-display mb-8 text-center text-2xl tracking-widest text-offwhite md:text-3xl">
            OUR JOURNEY
          </h3>
          <div className="relative">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className="relative border-l-2 border-brand-orange bg-bg-dark-2/80 px-4 py-3 pl-5"
                >
                  <span className="font-display text-2xl text-brand-orange">
                    {m.year}
                  </span>
                  <p className="font-body mt-1 text-sm text-offwhite/90">
                    {m.text}
                  </p>
                  {i < milestones.length - 1 && (
                    <span
                      className="absolute -right-3 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-border-subtle xl:block"
                      aria-hidden
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
