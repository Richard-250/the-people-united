"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Building2 } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";

const links = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Team", id: "team" },
  { label: "Training", id: "training" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-brand-orange/20 bg-bg-dark/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => go("home")}
          className="flex items-center gap-2 text-left"
          aria-label="The People United home"
        >
          <Building2 className="h-8 w-8 shrink-0 text-brand-orange" />
          <span className="font-display text-xl tracking-widest text-brand-orange md:text-2xl">
            THE PEOPLE UNITED
            <span className="ml-1 text-offwhite">LTD</span>
          </span>
        </button>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                onClick={() => go(l.id)}
                className="font-body text-sm font-medium uppercase tracking-wider text-offwhite/90 transition-colors hover:text-brand-orange"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <motion.button
            type="button"
            onClick={() => go("contact")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="hidden rounded-sm bg-brand-orange px-5 py-2.5 font-body text-sm font-semibold uppercase tracking-wide text-charcoal shadow-lg shadow-brand-orange/25 md:inline-block"
          >
            Get a Quote
          </motion.button>

          <button
            type="button"
            className="rounded-sm p-2 text-offwhite lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden border-t border-brand-orange/20 bg-bg-dark/98 backdrop-blur-lg lg:hidden"
          >
            <motion.ul
              className="flex flex-col gap-1 px-4 py-4"
              initial="closed"
              animate="open"
              variants={{
                open: { transition: { staggerChildren: 0.06 } },
                closed: {},
              }}
            >
              {links.map((l) => (
                <motion.li
                  key={l.id}
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: -12 },
                  }}
                >
                  <button
                    type="button"
                    onClick={() => go(l.id)}
                    className="block w-full py-3 text-left font-body text-sm font-medium uppercase tracking-widest text-offwhite hover:text-brand-orange"
                  >
                    {l.label}
                  </button>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  open: { opacity: 1, x: 0 },
                  closed: { opacity: 0, x: -12 },
                }}
              >
                <button
                  type="button"
                  onClick={() => go("contact")}
                  className="mt-2 w-full rounded-sm bg-brand-orange py-3 font-body text-sm font-semibold uppercase tracking-wide text-charcoal"
                >
                  Get a Quote
                </button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
