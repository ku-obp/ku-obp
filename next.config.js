/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/worker",
        destination: "/_next/static/worker",
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/worker/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
