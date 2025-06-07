import nextConfig from './next.config.js'; // Instead of require()
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  async rewrites() {
    return [
      {
        basePath: "/",
        source: "/admin/:path*",
        destination: "https://seaside-backend.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;
