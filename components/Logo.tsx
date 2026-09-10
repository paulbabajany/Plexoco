import { BOXES, CO, RULE, WORDMARK } from "./logo-paths";

type Variant = keyof typeof BOXES;

type Props = {
  /** `lockup` is wordmark + rule + co. `monogram` is the p with the rule crossing it. */
  variant?: Variant;
  className?: string;
  /** Accessible name. Ignored when `decorative` is set. */
  title?: string;
  /** Hide from assistive tech when the mark sits next to visible text that already names it. */
  decorative?: boolean;
};

/**
 * The plexo mark, inlined so it inherits `currentColor` and inverts on the ink
 * surface. Path data is traced from plexo-logo.svg by scripts/trace-logo.mjs.
 * The rule is a stroke, so the hero can draw it; everything else is a fill.
 */
export function Logo({ variant = "lockup", className, title = "plexo co.", decorative }: Props) {
  const box = BOXES[variant];
  const a11y = decorative
    ? { "aria-hidden": true as const }
    : { role: "img" as const, "aria-label": title };

  return (
    <svg
      viewBox={`${box.x} ${box.y} ${box.w} ${box.h}`}
      className={className}
      fill="currentColor"
      {...a11y}
    >
      {variant === "lockup" ? (
        <>
          {WORDMARK.map((g) => (
            <path key={g.name} transform={`translate(${g.tx} ${g.ty})`} d={g.d} />
          ))}
          {CO.map((g) => (
            <path key={g.name} transform={`translate(${g.tx} ${g.ty})`} d={g.d} />
          ))}
          <path
            d={RULE.d}
            fill="none"
            stroke="currentColor"
            strokeWidth={RULE.strokeWidth}
            strokeLinecap="butt"
          />
        </>
      ) : (
        <>
          <path
            transform={`translate(${WORDMARK[0].tx} ${WORDMARK[0].ty})`}
            d={WORDMARK[0].d}
          />
          <path
            d={`M ${RULE.x0} ${RULE.y} L ${WORDMARK[0].tx + 223} ${RULE.y}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={RULE.strokeWidth}
            strokeLinecap="butt"
          />
        </>
      )}
    </svg>
  );
}
