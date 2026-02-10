/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/WGHotel-Website',
  images: {
    // Disable image optimization for static export (GitHub Pages requirement)
    unoptimized: true,
  },
};

module.exports = nextConfig;
