"use client";

import Link from "next/link";
import { Building2 } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/BrandIcons";
import { companyInfo, services } from "@/data";
import { scrollToSection } from "@/lib/scroll";

const quick = [
  ["Home", "home"],
  ["About", "about"],
  ["Services", "services"],
  ["Projects", "projects"],
  ["Team", "team"],
  ["Training", "training"],
  ["Contact", "contact"],
] as const;

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-brand-orange bg-bg-dark">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-brand-orange" />
              <span className="font-display text-lg tracking-widest text-brand-orange">
                tTHE PEOPLE CONSTRUCTION
                <span className="text-offwhite"> ltd</span>
              </span>
            </div>
            <p className="font-body mt-4 text-sm leading-relaxed text-text-muted">
              {companyInfo.tagline}
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href={companyInfo.socials.linkedin}
                className="text-offwhite/70 transition-colors hover:text-brand-orange"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
              <a
                href={companyInfo.socials.instagram}
                className="text-offwhite/70 transition-colors hover:text-brand-orange"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href={companyInfo.socials.facebook}
                className="text-offwhite/70 transition-colors hover:text-brand-orange"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg tracking-widest text-offwhite">
              Quick links
            </h3>
            <ul className="mt-4 space-y-2">
              {quick.map(([label, id]) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(id)}
                    className="font-body text-sm text-text-muted transition-colors hover:text-brand-orange"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg tracking-widest text-offwhite">
              Services
            </h3>
            <ul className="mt-4 space-y-2">
              {services.map((s) => (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => scrollToSection("services")}
                    className="font-body text-left text-sm text-text-muted transition-colors hover:text-brand-orange"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg tracking-widest text-offwhite">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 font-body text-sm text-text-muted">
              <li>{companyInfo.address}</li>
              <li>
                <a
                  href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
                  className="hover:text-brand-orange"
                >
                  {companyInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="break-all hover:text-brand-orange"
                >
                  {companyInfo.email}
                </a>
              </li>
              <li>{companyInfo.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border-subtle pt-8 text-center">
          <p className="font-body text-xs text-text-muted">
            © {year} {companyInfo.name}. All rights reserved.
          </p>
          <p className="font-body mt-2 text-xs text-text-muted">
            Built with precision in Kigali 🇷🇼 ·{" "}
            <Link
              href="/portal"
              className="opacity-50 transition-opacity hover:text-brand-orange hover:opacity-100"
            >
              Owner
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
