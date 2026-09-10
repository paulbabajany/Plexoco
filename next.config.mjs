// Plain JavaScript on purpose: some hosts (Hostinger among them) fail to load
// the compiled output of a TypeScript next.config, so this file stays .mjs.

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
