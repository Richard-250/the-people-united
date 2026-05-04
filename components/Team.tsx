"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";
import { LinkedInIcon } from "@/components/BrandIcons";
import { team } from "@/data";

export default function Team() {
  return (
    <section
      id="team"
      className="scroll-mt-24 border-y border-border-subtle bg-bg-dark-2 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center"
        >
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
            Leadership
          </p>
          <h2 className="font-display mt-3 text-5xl tracking-widest text-offwhite md:text-6xl">
            MEET OUR TEAM
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex flex-col rounded-sm border border-border-subtle bg-bg-card p-6 text-center"
            >
              <div className="relative mx-auto">
                <div className="group relative h-36 w-36 overflow-hidden rounded-full ring-2 ring-transparent transition-all duration-300 hover:ring-brand-orange">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="144px"
                  />
                </div>
              </div>
              <h3 className="font-display mt-6 text-2xl tracking-widest text-offwhite">
                {member.name}
              </h3>
              <p className="font-body mt-1 text-xs font-semibold uppercase tracking-widest text-brand-orange">
                {member.role}
              </p>
              <p className="font-body mt-4 text-sm leading-relaxed text-text-muted">
                {member.bio}
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {member.skills.map((sk) => (
                  <span
                    key={sk}
                    className="rounded-full border border-brand-orange/50 px-2 py-0.5 font-body text-[10px] font-medium uppercase tracking-wide text-offwhite/90"
                  >
                    {sk}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex justify-center gap-4">
                <a
                  href={member.linkedin}
                  className="text-offwhite/70 transition-colors hover:text-brand-orange"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <LinkedInIcon className="h-5 w-5" />
                </a>
                {member.whatsapp !== "#" ? (
                  <a
                    href={member.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-offwhite/70 transition-colors hover:text-brand-orange"
                    aria-label={`WhatsApp ${member.name}`}
                  >
                    <MessageCircle className="h-5 w-5" />
                  </a>
                ) : (
                  <span
                    className="cursor-not-allowed text-offwhite/30"
                    aria-hidden
                  >
                    <MessageCircle className="h-5 w-5" />
                  </span>
                )}
                <a
                  href={`mailto:${member.email}`}
                  className="text-offwhite/70 transition-colors hover:text-brand-orange"
                  aria-label={`Email ${member.name}`}
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
