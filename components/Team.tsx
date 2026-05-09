"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";
import { LinkedInIcon } from "@/components/BrandIcons";
import { team } from "@/data";

function initialsFrom(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0] + parts[parts.length - 1]![0]).toUpperCase();
}

type Member = (typeof team)[number];

function MemberCard({
  member,
  index,
  largePhoto,
}: {
  member: Member;
  index: number;
  largePhoto?: boolean;
}) {
  const hasPhoto = "image" in member && Boolean(member.image);
  const size = largePhoto ? "h-44 w-44" : "h-36 w-36";

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="flex flex-col rounded-sm border border-border-subtle bg-bg-card p-6 text-center"
    >
      <div className="mx-auto">
        <div
          className={`group relative ${size} overflow-hidden rounded-full ring-2 ring-brand-orange/40 transition-all duration-300 hover:ring-brand-orange`}
        >
          {hasPhoto ? (
            <Image
              src={member.image as string}
              alt={member.name}
              fill
              className="object-cover object-top"
              sizes={largePhoto ? "176px" : "144px"}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-charcoal">
              <span className="font-display text-4xl tracking-widest text-brand-orange">
                {initialsFrom(member.name)}
              </span>
            </div>
          )}
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
  );
}

export default function Team() {
  const coFounders = team.filter(
    (m): m is Member & { coFounder: true } => m.coFounder === true,
  );
  const otherTeam = team.filter((m) => !m.coFounder);

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
          <p className="font-body mx-auto mt-4 max-w-2xl text-sm text-text-muted">
            Our co-founders lead technical delivery and field operations; the
            wider team supports architecture, survey, and operations.
          </p>
        </motion.div>

        <div className="mt-14">
          <h3 className="font-display text-center text-xl tracking-[0.25em] text-brand-orange md:text-2xl">
            CO-FOUNDERS
          </h3>
          <div className="mx-auto mt-10 grid max-w-4xl gap-10 md:grid-cols-2 md:gap-12">
            {coFounders.map((member, i) => (
              <MemberCard
                key={member.name}
                member={member}
                index={i}
                largePhoto
              />
            ))}
          </div>
        </div>

        <div className="mt-20 border-t border-border-subtle pt-16">
          <h3 className="font-display text-center text-xl tracking-[0.25em] text-offwhite/90 md:text-2xl">
            TEAM
          </h3>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {otherTeam.map((member, i) => (
              <MemberCard
                key={member.name}
                member={member}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
