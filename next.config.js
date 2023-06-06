/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: "loose",
    appDir: true,
  },
}

module.exports = nextConfig
