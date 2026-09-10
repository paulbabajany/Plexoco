import Link from "next/link";
import { ButtonLink } from "./Button";
import { HeroMark } from "./HeroMark";
import { ParticleField } from "./ParticleField";
import { WireframeSphere } from "./WireframeSphere";
import { home } from "@/content/home";
import { site } from "@/content/site";

export function Hero() {
  return (
    <div className="relative">
      {/* Full-bleed particle field behind the hero. Faint on purpose. */}
      <ParticleField className="absolute inset-0 h-full w-full" />
    <section aria-labelledby="hero-title" className="content relative pt-14 pb-section md:pt-16 lg:pt-20">
      {/* About half the content width on desktop so the mark and the sentence share the first screen. */}
      <div className="text-ink md:w-[72%] lg:w-[48%]">
        <HeroMark />
        {/* The tagline sits where the file puts it: under the rule, starting just right of the p's stem. */}
        <p
          className="hero-after mt-4 text-tagline uppercase text-mute md:mt-6"
          style={{ marginLeft: "8%" }}
        >
          {site.tagline}
        </p>
      </div>

      <div className="hero-after mt-14 grid gap-x-6 md:mt-16 md:grid-cols-12 lg:mt-14">
        {/* The wireframe sphere fills the air in the left four columns, centred beside the sentence. */}
        <div className="hidden md:col-span-4 md:flex md:items-center md:justify-center">
          <WireframeSphere className="size-56 lg:size-72" />
        </div>
        <div className="md:col-span-8 md:col-start-5">
          <h1 id="hero-title" className="max-w-[24ch] text-display text-balance">
            {home.hero.sentence}
          </h1>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href={home.hero.primary.href}>{home.hero.primary.label}</ButtonLink>
            <Link href={home.hero.secondary.href} className="link">
              {home.hero.secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
