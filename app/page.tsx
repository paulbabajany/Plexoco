import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { ProofSlot } from "@/components/ProofSlot";
import { Section } from "@/components/Section";
import { ServiceRows } from "@/components/ServiceRows";
import { home } from "@/content/home";
import { services } from "@/content/services";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section id="what-we-do" title={home.services.title} aside={home.services.aside}>
        <ServiceRows services={services} />
        <p className="mt-8">
          <Link href={home.services.more.href} className="link">
            {home.services.more.label}
          </Link>
        </p>
      </Section>

      <Section id="how-we-work" title={home.process.title} aside={home.process.aside}>
        <Process />
      </Section>

      <ProofSlot />
    </>
  );
}
