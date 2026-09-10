export const home = {
  hero: {
    sentence:
      "plexo is a marketing agency in Los Angeles that uses AI for the work it is good at, and people for the rest.",
    primary: { label: "Start a project", href: "/contact" },
    secondary: { label: "What we do", href: "#what-we-do" },
  },
  services: {
    title: "What we do",
    aside:
      "Five services. Each one is a thing you can buy on its own, and they are built to fit together.",
    more: { label: "Every service in detail", href: "/services" },
  },
  process: {
    title: "How we work",
    aside: "Four steps. The fourth is optional.",
  },
  cta: {
    title: "Tell us what you need.",
    body: "Name, company, budget and a few lines about the problem. We read everything and reply within two working days.",
    primary: { label: "Start a project", href: "/contact" },
  },
} as const;
