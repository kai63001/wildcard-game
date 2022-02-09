/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ipfs.infura.io', 'ipfs.io'],
  },
}

module.exports = nextConfig
