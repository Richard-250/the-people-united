"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { companyInfo, rwandaProjectAreas } from "@/data";

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
                src="/images/about-architecture-render.png"
                alt="Modern reception and pavilion — architectural visualization"
                fill
                className="object-cover object-center"
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
              BUILT FOR RWANDA — FROM KIGALI TO EVERY PROVINCE
            </h2>
            <p className="font-body mt-6 text-base leading-relaxed text-text-muted md:text-lg">
              {companyInfo.name} is a multidisciplinary construction and
              engineering firm delivering structural design, architecture,
              surveying, and consultancy nationwide. We combine international
              standards with local insight — so every structure we touch is
              safe, efficient, and built for generations.
            </p>
            <p className="font-body mt-4 text-base leading-relaxed text-text-muted md:text-lg">
              Our sites and deliveries span key growth areas including{" "}
              <strong className="text-offwhite/90">
                {rwandaProjectAreas.slice(0, 8).join(", ")}
              </strong>
              , and many more cells and districts across the country — from{" "}
              <strong className="text-offwhite/90">Masaka</strong>,{" "}
              <strong className="text-offwhite/90">Kicukiro</strong>,{" "}
              <strong className="text-offwhite/90">Musanze</strong>, and{" "}
              <strong className="text-offwhite/90">Rusizi</strong> to Eastern,
              Northern, and Western corridors.
            </p>
            <p className="font-body mt-4 text-base leading-relaxed text-text-muted md:text-lg">
              We partner with developers, institutions, and homeowners from first
              sketch to handover — including professional software training backed
              by real project PDFs (CSI SAFE, ETABS, SAP2000, AutoCAD, Lumion).
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
