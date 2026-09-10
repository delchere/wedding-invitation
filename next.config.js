/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  trailingSlash: true,
  images: {
    domains: ['v5.airtableusercontent.com', 'maps.googleapis.com'],
    unoptimized: true,
  },
}

module.exports = nextConfig
