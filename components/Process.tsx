import { process } from "@/content/process";

/**
 * The four steps on one connecting rule. Horizontal from 768px, vertical
 * below. The markers are rounded rectangles in the brand radius; the order is
 * carried by the rule and the copy, not by numerals.
 */
export function Process() {
  return (
    <ol className="relative grid gap-y-10 md:grid-cols-4 md:gap-x-6">
      {/* The connecting rule. Vertical through the markers on mobile, horizontal at md. */}
      <div
        aria-hidden
        className="absolute top-0 bottom-0 left-[6px] w-px bg-rule md:top-[11px] md:right-0 md:bottom-auto md:left-0 md:h-px md:w-auto"
      />
      {process.map((step) => (
        <li key={step.name} className="relative pl-8 md:pl-0">
          <span
            aria-hidden
            className="absolute top-0 left-0 block h-[22px] w-[14px] rounded-1 border border-ink bg-paper md:relative md:mb-5"
          />
          <h3 className="text-title">{step.name}</h3>
          <p className="mt-1 text-small text-mute">{step.duration}</p>
          <p className="mt-3 max-w-[32ch] text-body">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
