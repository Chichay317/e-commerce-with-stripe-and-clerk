/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.ibb.co", "images.pexels.com", "img.clerk.com"],
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
