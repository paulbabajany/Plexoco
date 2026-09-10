"use client";

import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/content/stats";

const DURATION = 700; // ms; all four numbers run together and finish well under a second

/** Split "$1.5M+" into { prefix: "$", number: 1.5, decimals: 1, suffix: "M+" }. */
function parse(value: string) {
  const m = value.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
  if (!m) return null;
  const raw = m[2];
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
  return {
    prefix: m[1],
    number: parseFloat(raw.replace(/,/g, "")),
    decimals,
    grouped: raw.includes(","),
    suffix: m[3],
  };
}

function format(n: number, decimals: number, grouped: boolean) {
  return grouped
    ? n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : n.toFixed(decimals);
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Full-bleed band of four metrics on the ink ground. Numbers count up once
 * when the band scrolls into view. The final value is always in the DOM for
 * assistive tech; only the visible, aria-hidden copy animates.
 */
export function StatsBar({ stats }: { stats: readonly Stat[] }) {
  const ref = useRef<HTMLElement>(null);
  // null until the band scrolls into view (final values shown), then 0 → 1 while counting.
  // Stays null under reduced motion, so the final values are simply rendered.
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setProgress(0);
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION);
          setProgress(easeOut(t));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} aria-label="Results so far" className="on-ink bg-ink text-paper">
      {/* Horizontal rules across the full bleed, at the logo's stroke weight, faint. */}
      <div className="h-px bg-paper/15" aria-hidden />
      <div className="content">
        <ul className="grid grid-cols-2 py-16 md:py-24 lg:grid-cols-4 lg:py-28">
          {stats.map((s, i) => {
            const p = parse(s.value);
            // The final value is what is in the DOM until the count starts, and always for assistive tech.
            const shown =
              p && progress !== null
                ? `${p.prefix}${format(p.number * progress, p.decimals, p.grouped)}${p.suffix}`
                : s.value;
            return (
              <li
                key={s.label}
                className={[
                  "py-8 pr-6 border-paper/15",
                  // Vertical rules between cells: two columns below lg, four at lg.
                  "even:border-l even:pl-6 lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0",
                  // A rule between the two rows below lg.
                  i >= 2 ? "border-t lg:border-t-0" : "",
                ].join(" ")}
              >
                <p
                  className="font-light tabular-nums leading-none tracking-[-0.03em]"
                  style={{ fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)" }}
                >
                  <span aria-hidden>{shown}</span>
                  <span className="sr-only">{s.value}</span>
                </p>
                <p className="mt-3 max-w-[18ch] text-small text-paper/64">{s.label}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="h-px bg-paper/15" aria-hidden />
    </section>
  );
}
