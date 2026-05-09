"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { testimonials } from "@/data";

export default function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = useCallback((i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement;
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft - 16, behavior: "smooth" });
    setActive(i);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const scrollLeft = el.scrollLeft;
      const w = el.offsetWidth;
      const idx = Math.round(scrollLeft / Math.max(w * 0.85, 280));
      setActive(Math.min(Math.max(idx, 0), testimonials.length - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % testimonials.length;
        const el = scrollerRef.current;
        if (el) {
          const card = el.children[next] as HTMLElement;
          if (card)
            el.scrollTo({
              left: card.offsetLeft - 16,
              behavior: "smooth",
            });
        }
        return next;
      });
    }, 5200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-bg-dark py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center"
        >
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
            Client stories
          </p>
          <h2 className="font-display mt-3 text-5xl tracking-widest text-offwhite md:text-6xl">
            TESTIMONIALS
          </h2>
        </motion.div>

        <div
          ref={scrollerRef}
          className="scrollbar-hide mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
        >
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.05 }}
              className="relative min-w-[min(100%,320px)] flex-shrink-0 snap-center rounded-sm border border-border-subtle bg-bg-card p-8 md:min-w-[380px]"
            >
              <Quote className="absolute right-6 top-6 h-16 w-16 text-brand-orange/10" />
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-gold text-gold"
                  />
                ))}
              </div>
              <p className="font-body relative z-10 mt-6 text-sm leading-relaxed text-offwhite/90 md:text-base">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-charcoal ring-2 ring-brand-orange/30"
                  aria-hidden
                >
                  <span className="font-display text-lg tracking-wide text-brand-orange">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="font-display text-lg tracking-wide text-offwhite">
                    {t.name}
                  </p>
                  <p className="font-body text-xs text-text-muted">{t.role}</p>
                  <span className="mt-1 inline-block rounded-sm bg-brand-orange/15 px-2 py-0.5 font-body text-[10px] font-semibold uppercase tracking-wide text-brand-orange">
                    {t.project}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                active === i ? "bg-brand-orange" : "bg-border-subtle"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
