import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { about } from "@/content/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "plexo was set up in Los Angeles in 2026 to charge for judgment and treat volume as a given. The argument, and what we will not do.",
};

export default function AboutPage() {
  return (
    <>
      <section aria-labelledby="about-title" className="content pt-16 pb-16 md:pt-24 md:pb-24">
        <div className="grid gap-x-6 gap-y-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-body text-mute">{about.aside}</p>
          </div>
          <div className="md:col-span-8">
            <h1 id="about-title" className="max-w-[22ch] text-display text-balance">
              {about.title}
            </h1>
          </div>
        </div>
      </section>

      <Section id="argument" title="The argument">
        <div className="max-w-[60ch] space-y-6 text-body-lg">
          {about.argument.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
      </Section>

      <Section id="wont" title={about.wontTitle}>
        <ul className="max-w-[60ch] space-y-4 text-body-lg">
          {about.wont.map((line) => (
            <li key={line} className="border-l border-ink pl-5">
              {line}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
