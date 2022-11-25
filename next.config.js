/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['links.papareact.com', 'images.unsplash.com'],
  },
};

module.exports = nextConfig;
