import type { ReactNode } from "react";

type Props = {
  id: string;
  title: string;
  /** Short supporting text under the title, in the left column. */
  aside?: ReactNode;
  children: ReactNode;
  /** Render the title as h1 on pages where the section is the page. */
  level?: "h1" | "h2";
};

/**
 * A page section: a rule that bleeds to the viewport's left edge and stops at
 * the content's right edge, then a 4 / 8 split with the heading on the left.
 */
export function Section({ id, title, aside, children, level = "h2" }: Props) {
  const Heading = level;
  return (
    <section aria-labelledby={`${id}-title`} className="content">
      <div className="rule-bleed" aria-hidden />
      <div className="grid gap-x-6 gap-y-8 pt-8 pb-section md:grid-cols-12 md:pt-12">
        <div className="md:col-span-4">
          <Heading id={`${id}-title`} className="text-title text-balance">
            {title}
          </Heading>
          {aside ? <p className="mt-4 max-w-[28ch] text-body text-mute">{aside}</p> : null}
        </div>
        <div className="md:col-span-8">{children}</div>
      </div>
    </section>
  );
}
