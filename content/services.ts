export type Service = {
  slug: string;
  name: string;
  /** One line, shown in the home page list. */
  summary: string;
  /** What it is, in plain language. */
  what: string;
  /** What the client actually receives. */
  receive: readonly string[];
  /** Who it is for. */
  who: string;
};

export const services: readonly Service[] = [
  {
    slug: "ai-built-campaigns",
    name: "AI-built campaigns",
    summary:
      "Creative and copy produced with AI in the loop, at volume, without the sameness.",
    what:
      "We build campaigns the way a small studio would if it had a hundred hands. A strategist sets the idea and the rules, models draft against them in bulk, and people choose, edit and kill. You get more variants than a traditional shop can make and fewer than a tool can spit out, because most of what a tool spits out is the same ad five ways.",
    receive: [
      "A campaign brief you can hold us to",
      "Concept, copy and creative across every format you run",
      "Variant sets built for testing, labelled so the results mean something",
      "A rule set for the brand that models and people both follow",
      "Handover files, source and prompts, all yours",
    ],
    who: "Teams that need to ship a lot of creative without a big in-house studio, and are tired of everything looking like everything else.",
  },
  {
    slug: "marketing-automation",
    name: "Marketing automation",
    summary:
      "Lifecycle, lead routing and reporting wired together so the team stops doing it by hand.",
    what:
      "Most marketing teams run on a chain of spreadsheets, Zaps and someone remembering. We map what actually happens when a lead comes in, an order ships or a trial ends, then build the system that does it every time. Where a model helps, writing the follow-up, scoring the lead, summarising the week, it is in the loop. Where it does not, it is not.",
    receive: [
      "A map of your current process, including the parts nobody wrote down",
      "Lifecycle flows: welcome, nurture, win-back, renewal, built in the tools you already have where possible",
      "Lead routing with rules you can read",
      "One reporting view that pulls from the tools you already pay for",
      "Documentation short enough that someone will read it",
    ],
    who: "Companies with a working funnel and a team spending its afternoons on the plumbing.",
  },
  {
    slug: "custom-ai-tools",
    name: "Custom AI tools",
    summary: "Internal agents and workflows built for one client's specific process.",
    what:
      "Off-the-shelf AI tools are built for everyone, which is why they fit no one. We build small tools for one job: the agent that drafts your weekly client report from the data, the workflow that turns a call transcript into a proposal, the reviewer that checks every ad against your brand rules before it goes out. Each one is scoped, tested against your real material and handed over with the code.",
    receive: [
      "A written scope that says what the tool does and what it refuses to do",
      "The working tool, deployed where your team already works",
      "An evaluation set built from your real inputs, so you can see when it is wrong",
      "Source code, prompts and a runbook",
      "A month of tuning after launch",
    ],
    who: "Operators with a repeatable process that eats hours, and the patience to describe it properly once.",
  },
  {
    slug: "brand-and-content-systems",
    name: "Brand and content systems",
    summary: "Identity, site and a content engine that keeps producing after launch.",
    what:
      "A brand is not a logo file. It is the set of decisions that stop you having to decide again. We make those decisions with you, build the identity and the site, then set up the system that turns them into content every week: templates, rules, a model that knows the voice, and a person who signs off.",
    receive: [
      "Identity: mark, type, colour and the rules for using them",
      "A website on a modern stack, fast, accessible and yours",
      "A content engine: formats, cadence, templates and a tuned model for drafting",
      "A style guide written for people and for models",
      "Training for whoever runs it after us",
    ],
    who: "New companies, or older ones whose brand stopped matching what they do.",
  },
  {
    slug: "performance-media",
    name: "Performance media",
    summary: "Paid acquisition managed against real pipeline, not impressions.",
    what:
      "We run paid search, social and retail media against one measure: what it does to revenue. That means connecting the ad accounts to the CRM before spending a dollar, reporting on pipeline and payback rather than clicks, and turning things off when the numbers say so. Models help with bid analysis, creative rotation and the reporting. A person decides where the money goes.",
    receive: [
      "Tracking that connects spend to pipeline, fixed before any spend",
      "A channel plan with a budget and a stop rule for each line",
      "Creative rotation fed by the campaign service, or your own assets",
      "A weekly report in plain English with the decision we made and why",
      "No lock-in: the accounts stay in your name",
    ],
    who: "Companies that have found something people want to buy and need it in front of more of them, profitably.",
  },
] as const;
