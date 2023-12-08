/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/game/two-worlds/room/create",
        destination: "https://ws.fly.dev/create"
      }
    ]
  }
};

module.exports = nextConfig;
