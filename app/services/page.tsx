import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI-built campaigns, marketing automation, custom AI tools, brand and content systems, and performance media. What each one is, what you receive, and who it is for.",
};

export default function ServicesPage() {
  return (
    <>
      <section aria-labelledby="services-title" className="content pt-16 pb-16 md:pt-24 md:pb-24">
        <div className="grid gap-x-6 gap-y-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="max-w-[28ch] text-body text-mute">
              Each service is a thing you can buy on its own. Most clients start with one and add a
              second once the first is boring.
            </p>
          </div>
          <div className="md:col-span-8">
            <h1 id="services-title" className="max-w-[22ch] text-display text-balance">
              Five things we do, and what you get from each.
            </h1>
          </div>
        </div>
      </section>

      {services.map((s) => (
        <Section key={s.slug} id={s.slug} title={s.name} aside={s.summary}>
          <p className="max-w-[60ch] text-body-lg">{s.what}</p>
          <div className="mt-10 grid gap-x-6 gap-y-8 md:grid-cols-2">
            <div>
              <h3 className="text-small text-mute">What you get</h3>
              <ul className="mt-3 space-y-2">
                {s.receive.map((r) => (
                  <li key={r} className="border-l border-ink pl-4">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-small text-mute">Who it&rsquo;s for</h3>
              <p className="mt-3 max-w-[40ch]">{s.who}</p>
            </div>
          </div>
        </Section>
      ))}
    </>
  );
}
