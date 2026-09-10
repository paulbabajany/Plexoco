export type Step = { name: string; duration: string; body: string };

/** A genuine sequence. Order matters, so it is rendered as an ordered list. */
export const process: readonly Step[] = [
  {
    name: "Listen",
    duration: "Two weeks",
    body: "We sit with the people who do the work, read what you already have, and write down what is actually going on. You get a short document that says what we would do and what it costs. If the honest answer is not us, we say so.",
  },
  {
    name: "Build",
    duration: "Four to eight weeks",
    body: "Then we build the system, the campaign or the tool, in the open, with a working version you can poke at from the second week.",
  },
  {
    name: "Run",
    duration: "Monthly",
    body: "Then we operate it with you until it is boring. Reporting is weekly and written for people who have other jobs.",
  },
  {
    name: "Hand over",
    duration: "Or keep going",
    body: "When it is boring, we hand it over: code, prompts, documentation, training. Or we keep running it. Your call, on a month's notice.",
  },
] as const;
