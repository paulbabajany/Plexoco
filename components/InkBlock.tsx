"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonLink } from "./Button";
import { Logo } from "./Logo";
import { home } from "@/content/home";
import { nav, site } from "@/content/site";

/**
 * The one inverted surface on the site: the contact CTA and the footer share
 * it, so every page ends the same way. The CTA is dropped on /contact, where
 * the form is the CTA.
 */
export function InkBlock() {
  const pathname = usePathname();
  const showCta = pathname !== "/contact";

  return (
    <div className="on-ink mt-auto bg-ink text-paper">
      <div className="content">
        {showCta ? (
          <section
            aria-labelledby="cta-title"
            className="grid gap-x-6 gap-y-8 pt-section md:grid-cols-12"
          >
            <div className="md:col-span-4">
              <h2 id="cta-title" className="text-title text-balance">
                {home.cta.title}
              </h2>
            </div>
            <div className="md:col-span-8">
              <p className="max-w-[52ch] text-body-lg">{home.cta.body}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <ButtonLink href={home.cta.primary.href} tone="ink">
                  {home.cta.primary.label}
                </ButtonLink>
                <a href={`mailto:${site.email}`} className="link">
                  {site.email}
                </a>
              </div>
            </div>
          </section>
        ) : null}

        <footer className={`${showCta ? "mt-section" : "mt-section"} pb-10`}>
          <div className="h-px bg-paper/20" aria-hidden />
          <div className="grid gap-x-6 gap-y-8 pt-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <Link href="/" aria-label={`${site.name}, home`} className="inline-block rounded-1">
                <Logo variant="lockup" decorative className="h-10 w-auto" />
              </Link>
            </div>
            <div className="md:col-span-4">
              {/* The fact line: the only bold on the site, set the way the logo file sets ESTD. 2026. */}
              <p className="text-fact uppercase tracking-[0.06em]">
                Est. {site.founded}
                <br />
                <span className="font-normal normal-case tracking-normal text-paper/64">
                  Located in {site.city}
                </span>
              </p>
            </div>
            <nav aria-label="Footer" className="md:col-span-4">
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-small">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="link">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${site.email}`} className="link">
                    {site.email}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
}
