/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/admin/",
        destination: "https://seaside-backend.vercel.app/",
      },
    ];
  },
};

export default nextConfig;
