import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Tell us what you need. We reply within ${site.replyWindow}.`,
};

// The form and its route handler arrive in build step 5.
export default function ContactPage() {
  return (
    <section aria-labelledby="contact-title" className="content pt-16 pb-section md:pt-24">
      <div className="grid gap-x-6 gap-y-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="max-w-[28ch] text-body text-mute">
            We read everything and reply within {site.replyWindow}.
          </p>
        </div>
        <div className="md:col-span-8">
          <h1 id="contact-title" className="max-w-[22ch] text-display text-balance">
            Tell us what you need.
          </h1>
          <p className="mt-10 max-w-[52ch] text-body-lg">
            The form is on its way. Until then, email{" "}
            <a href={`mailto:${site.email}`} className="link">
              {site.email}
            </a>{" "}
            with your name, company, a budget range and a few lines about the problem.
          </p>
        </div>
      </div>
    </section>
  );
}
