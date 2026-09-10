// Site-wide facts. Change a value here and it changes everywhere.

export const site = {
  name: "plexo co.",
  shortName: "plexo",
  tagline: "MARKETING | AI",
  description:
    "plexo is a marketing agency in Los Angeles that uses AI for the work it is good at, and people for the rest.",
  url: "https://plexo.co", // TODO: confirm the production domain
  email: "hello@plexo.co", // TODO: confirm
  city: "Los Angeles, CA",
  founded: 2026,
  replyWindow: "two working days",
} as const;

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
