import { FloatingTooltipProvider, FloatingTooltipTrigger } from "./FloatingTooltip";
import type { Stats } from "@/content/stats";

/**
 * The results grid under the hero: one primary cell on the ink ground with a
 * hatched corner, three supporting cells on paper. A bento layout, restyled
 * to the site's tokens: brand radii instead of pills, sentence-case labels,
 * light display numerals, hairline borders.
 *
 * Hovering a cell shows a pointer-following tooltip with a note on how the
 * figure is measured. The same note is in the DOM for assistive tech.
 *
 * Six columns by two rows from 768px; a single column below.
 */
export function StatsBento({ stats }: { stats: Stats }) {
  return (
    <section aria-labelledby="results-title" className="content pb-section">
      <h2 id="results-title" className="sr-only">
        Results so far
      </h2>
      <FloatingTooltipProvider>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-2">
          {/* Primary */}
          <FloatingTooltipTrigger
            content={stats.primary.label}
            description={stats.primary.note}
            className="md:col-span-3 md:row-span-2"
          >
            <div className="on-ink relative flex h-full flex-col justify-between overflow-hidden rounded-4 bg-ink p-8 text-paper md:p-10">
              {/* Diagonal hatch, hairline weight, fading in from the top-right corner. Decorative. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-30 [background:repeating-linear-gradient(45deg,var(--color-paper)_0px_1px,transparent_1px_10px)] [mask-image:radial-gradient(ellipse_80%_50%_at_100%_0%,#000_70%,transparent_110%)]"
              />
              <div className="relative">
                <span className="mb-6 inline-block rounded-1 bg-paper/10 px-3 py-1 text-small text-paper/70">
                  {stats.primary.label}
                </span>
                <p
                  className="font-light leading-none tracking-[-0.03em]"
                  style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)" }}
                >
                  {stats.primary.value}
                </p>
              </div>
              <p className="relative mt-16 max-w-[32ch] text-small text-paper/64 md:mt-0">
                {stats.primary.body}
              </p>
              <span className="sr-only">{stats.primary.note}</span>
            </div>
          </FloatingTooltipTrigger>

          {/* Time to a working build, with a small bar chart */}
          <FloatingTooltipTrigger
            content={stats.build.label}
            description={stats.build.note}
            className="md:col-span-3"
          >
            <div className="flex h-full items-center justify-between gap-6 rounded-4 border border-rule bg-paper p-8">
              <div>
                <p className="mb-1 text-small text-mute">{stats.build.label}</p>
                <p className="text-title font-light tracking-[-0.02em]">{stats.build.value}</p>
                <span className="sr-only">{stats.build.note}</span>
              </div>
              <div aria-hidden className="flex h-8 items-end gap-1">
                {stats.build.bars.map((h, i) => (
                  <div
                    key={i}
                    className="w-1.5 rounded-1 bg-ink"
                    style={{ height: `${Math.min(h, 100)}%` }}
                  />
                ))}
              </div>
            </div>
          </FloatingTooltipTrigger>

          {/* Businesses helped */}
          <FloatingTooltipTrigger
            content={stats.businesses.label}
            description={stats.businesses.note}
            className="md:col-span-1"
          >
            <div className="flex h-full flex-col justify-center rounded-4 border border-rule bg-paper p-6 text-center">
              <p className="text-title font-light tracking-[-0.02em]">{stats.businesses.value}</p>
              <p className="mt-1 text-small text-mute">{stats.businesses.label}</p>
              <span className="sr-only">{stats.businesses.note}</span>
            </div>
          </FloatingTooltipTrigger>

          {/* Reviews */}
          <FloatingTooltipTrigger
            content={stats.reviews.label}
            description={stats.reviews.note}
            className="md:col-span-2"
          >
            <div className="flex h-full items-center gap-4 rounded-4 border border-rule bg-paper p-6">
              <div
                aria-hidden
                className="flex size-10 shrink-0 items-center justify-center rounded-2 border border-ink text-xl leading-none"
              >
                ★
              </div>
              <div>
                <p className="leading-none">{stats.reviews.value}</p>
                <p className="mt-1 text-small text-mute">{stats.reviews.label}</p>
                <span className="sr-only">{stats.reviews.note}</span>
              </div>
            </div>
          </FloatingTooltipTrigger>
        </div>
      </FloatingTooltipProvider>
    </section>
  );
}
