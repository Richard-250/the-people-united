"use client";

import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { stats } from "@/data";

function StatCounter({
  value,
  suffix,
  label,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.25 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="relative flex flex-1 flex-col items-center justify-center px-4 py-8 text-center md:py-10"
    >
      <span className="font-display text-5xl tracking-widest text-brand-orange md:text-6xl lg:text-7xl">
        {inView ? (
          <CountUp end={value} duration={2.2} suffix={suffix} />
        ) : (
          <span className="opacity-40">0{suffix}</span>
        )}
      </span>
      <span className="font-body mt-2 max-w-[10rem] text-xs font-medium uppercase tracking-widest text-text-muted md:text-sm">
        {label}
      </span>
      {index < stats.length - 1 && (
        <div
          className="absolute right-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-border-subtle md:block"
          aria-hidden
        />
      )}
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section
      id="stats"
      className="relative overflow-hidden border-y border-border-subtle bg-bg-dark-2"
    >
      <div
        className="bg-noise pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-y-4 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((s, i) => (
            <StatCounter
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
