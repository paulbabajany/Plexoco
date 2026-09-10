/**
 * The results grid under the home page hero. Four cells: one primary, three
 * supporting. Values are display strings so symbols and suffixes live here.
 * Each cell has a `note`: one sentence on how the figure is measured, shown in
 * the tooltip on hover and to assistive tech.
 *
 * [EDIT] Every value below is a placeholder. Replace with real figures before
 * launch; do not invent numbers to fill the section. "Time to a working build"
 * should stay consistent with the process section's promise of a working
 * version by the second week.
 */
export const stats = {
  primary: {
    label: "Revenue influenced",
    value: "$1.5M+",
    body: "Client revenue our work contributed to, across every engagement since 2026.",
    note: "Revenue attributed to campaigns and systems we built, as reported by the clients themselves.",
  },
  build: {
    label: "Time to a working build",
    value: "15 days",
    note: "From kickoff to a version you can use, on a typical engagement.",
    /** Relative bar heights for the small chart, oldest to newest. Decorative. */
    bars: [10, 20, 40, 30, 60, 50, 80, 70, 90, 100, 110],
  },
  businesses: {
    label: "Businesses helped",
    value: "7+",
    note: "Companies we have worked with since opening in 2026.",
  },
  reviews: {
    label: "Client reviews",
    value: "4.9 / 5.0",
    note: "Average score across client reviews to date.",
  },
} as const;

export type Stats = typeof stats;
