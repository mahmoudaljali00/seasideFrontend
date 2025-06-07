/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/admin/:path*",
        destination: "https://seaside-backend.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;
