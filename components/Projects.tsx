"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin } from "lucide-react";
import { completedProjects, currentProjects } from "@/data";

function ProgressBar({ value }: { value: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <div ref={ref} className="mt-4">
      <div className="flex justify-between text-xs uppercase tracking-wider text-text-muted">
        <span>Progress</span>
        <span>{value}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-charcoal">
        <motion.div
          className="h-full rounded-full bg-brand-orange"
          initial={{ width: 0 }}
          animate={{ width: inView ? `${value}%` : 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
        />
      </div>
    </div>
  );
}

export default function Projects() {
  const [tab, setTab] = useState<"current" | "completed">("current");

  return (
    <section
      id="projects"
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
            Portfolio
          </p>
          <h2 className="font-display mt-3 text-5xl tracking-widest text-offwhite md:text-6xl">
            PROJECTS
          </h2>
        </motion.div>

        <div className="mt-10 flex justify-center gap-2">
          {(
            [
              ["current", "Current Projects"],
              ["completed", "Completed Projects"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`rounded-sm px-6 py-2.5 font-body text-xs font-semibold uppercase tracking-widest transition-colors md:text-sm ${
                tab === key
                  ? "bg-brand-orange text-charcoal"
                  : "border border-border-subtle bg-bg-card text-offwhite/80 hover:border-brand-orange/40"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="relative mt-12 min-h-[400px]">
          <AnimatePresence mode="wait">
            {tab === "current" ? (
              <motion.div
                key="current"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="grid gap-8 lg:grid-cols-3"
              >
                {currentProjects.map((p) => (
                  <article
                    key={p.title}
                    className="group relative overflow-hidden rounded-sm border border-border-subtle bg-bg-card"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                      <span
                        className={`absolute right-4 top-4 rounded-sm px-3 py-1 font-body text-xs font-bold uppercase tracking-wide ${
                          p.status === "In Progress"
                            ? "bg-brand-orange text-charcoal"
                            : "bg-steel text-offwhite"
                        }`}
                      >
                        {p.status}
                      </span>
                    </div>
                    <div className="p-6">
                      <p className="font-body text-xs font-semibold uppercase tracking-widest text-orange-400">
                        {p.category}
                      </p>
                      <h3 className="font-display mt-2 text-2xl tracking-widest text-offwhite">
                        {p.title}
                      </h3>
                      <p className="font-body mt-2 flex items-center gap-1 text-sm text-text-muted">
                        <MapPin className="h-4 w-4 shrink-0 text-brand-orange" />
                        {p.location}
                      </p>
                      <ProgressBar value={p.progress} />
                      <div className="mt-4 flex flex-wrap gap-4 text-xs text-text-muted">
                        <span>
                          <strong className="text-offwhite">Start:</strong>{" "}
                          {p.startDate}
                        </span>
                        <span>
                          <strong className="text-offwhite">ETA:</strong>{" "}
                          {p.expectedCompletion}
                        </span>
                      </div>
                      <p className="font-body mt-4 text-sm leading-relaxed text-text-muted">
                        {p.description}
                      </p>
                    </div>
                  </article>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="completed"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="columns-1 gap-6 sm:columns-2 lg:columns-3"
              >
                {completedProjects.map((p, i) => (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ delay: (i % 3) * 0.05 }}
                    className="group relative mb-6 break-inside-avoid overflow-hidden rounded-sm"
                  >
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-charcoal/20 transition-colors group-hover:bg-charcoal/60" />
                      <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-charcoal to-transparent p-6 transition-transform duration-300 group-hover:translate-y-0">
                        <p className="font-body text-xs font-semibold uppercase tracking-widest text-orange-400">
                          {p.category}
                        </p>
                        <h3 className="font-display mt-1 text-xl tracking-widest text-offwhite">
                          {p.title}
                        </h3>
                        <p className="font-body mt-2 text-sm text-text-muted">
                          {p.location} · {p.year}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
