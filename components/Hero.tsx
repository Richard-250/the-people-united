"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, Building2 } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";
import { companyInfo } from "@/data";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1800&q=90"
          alt="Construction and engineering"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/95 via-[#0D0D0D]/75 to-transparent"
          aria-hidden
        />
        <div
          className="bg-grid-pattern pointer-events-none absolute inset-0 opacity-80"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-28 md:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          <motion.h1
            variants={item}
            className="font-display text-8xl leading-[0.9] tracking-widest text-offwhite md:text-[120px]"
          >
            BUILDING RWANDA&apos;S FUTURE
          </motion.h1>
          <motion.h2
            variants={item}
            className="font-display mt-2 text-5xl tracking-widest text-brand-orange md:text-7xl"
          >
            ONE STRUCTURE AT A TIME
          </motion.h2>
          <motion.p
            variants={item}
            className="font-body mt-8 max-w-xl text-base leading-relaxed text-gray-400 md:text-lg"
          >
            {companyInfo.tagline} From structural design to software training,
            we deliver precision engineering for East Africa&apos;s built
            environment.
          </motion.p>
          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap gap-4"
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection("services")}
              className="rounded-sm bg-brand-orange px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wide text-charcoal shadow-lg shadow-brand-orange/30"
            >
              Explore Services
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection("projects")}
              className="rounded-sm border-2 border-offwhite px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-wide text-offwhite transition-colors hover:bg-offwhite/10"
            >
              View Projects
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        aria-hidden
      >
        <ChevronDown className="h-8 w-8 text-brand-orange/80" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 right-4 z-10 flex items-center gap-2 rounded-sm border border-brand-orange/30 bg-bg-dark/80 px-4 py-2 backdrop-blur-sm md:right-8"
      >
        <Building2 className="h-5 w-5 text-brand-orange" />
        <span className="font-body text-xs font-medium uppercase tracking-wider text-offwhite/90">
          Est. {companyInfo.founded} | {companyInfo.location}
        </span>
      </motion.div>
    </section>
  );
}
