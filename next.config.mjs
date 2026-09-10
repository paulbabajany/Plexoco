// Plain JavaScript on purpose: some hosts (Hostinger among them) fail to load
// the compiled output of a TypeScript next.config, so this file stays .mjs.

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // Pages: let CDNs keep a copy for five minutes and revalidate in the
        // background after that, so a deploy shows up without a manual purge.
        // Next.js's default for static pages is a year, which Hostinger's CDN
        // honours literally. Hashed assets under /_next/static keep their own
        // immutable headers.
        source: "/:path((?!_next/static|_next/image).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=300, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
