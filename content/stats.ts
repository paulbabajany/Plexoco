export type Stat = {
  /**
   * The full display value as a string, so symbols and suffixes live with the
   * data. The count-up parses the numeric part and leaves the rest static.
   */
  value: string;
  /** Sentence case. */
  label: string;
};

/**
 * [EDIT] Placeholders. Replace with real figures before launch; do not invent
 * numbers to fill the section. The fourth value should stay consistent with
 * the process section's promise of a working build by the second week.
 */
export const stats: readonly Stat[] = [
  { value: "$1.5M+", label: "Client revenue influenced" },
  { value: "7+", label: "Businesses helped" },
  { value: "120 hrs", label: "Manual work removed monthly" },
  { value: "15 days", label: "To a working build you can use" },
] as const;
