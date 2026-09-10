import { BOXES, CO, RULE, WORDMARK } from "./logo-paths";

const box = BOXES.lockup;

/**
 * How far the rule extends left of the mark, in canvas units. It has to reach
 * the viewport's edge at every size: at the mark's smallest desktop scale
 * (about 0.5px per unit) 2400 units is roughly 1200px, more than the widest
 * plausible left margin. The excess is off-screen and clipped by the viewport.
 */
const EXTENSION = 2400;

// One continuous path: the extension, then the file's own rule. Same stroke,
// same rasteriser, no seam.
const heroRuleD = `M ${RULE.x0 - EXTENSION} ${RULE.y} L ${RULE.x0} ${RULE.y} ${RULE.d.slice(
  RULE.d.indexOf("L")
)}`;

/**
 * The hero lockup. On load the rule enters from the left edge of the viewport,
 * crosses the p, runs under the word and turns up into the o. That is the one
 * orchestrated moment on the site. The sequence is CSS keyframes (see
 * globals.css, "hero sequence"), so it runs from the server-rendered HTML
 * without waiting for JavaScript, and prefers-reduced-motion renders it
 * finished.
 */
export function HeroMark() {
  return (
    <svg
      viewBox={`${box.x} ${box.y} ${box.w} ${box.h}`}
      className="block h-auto w-full overflow-visible"
      fill="currentColor"
      role="img"
      aria-label="plexo co."
    >
      {WORDMARK.map((g) => (
        <path key={g.name} transform={`translate(${g.tx} ${g.ty})`} d={g.d} />
      ))}
      {CO.map((g) => (
        <path key={g.name} transform={`translate(${g.tx} ${g.ty})`} d={g.d} />
      ))}
      <path
        className="hero-rule"
        d={heroRuleD}
        fill="none"
        stroke="currentColor"
        strokeWidth={RULE.strokeWidth}
        strokeLinecap="butt"
        pathLength={1}
      />
    </svg>
  );
}
