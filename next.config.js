/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/game/two-worlds/room/create",
        destination: (process.env.NEXT_PUBLIC_TWO_WORLDS_SOCKET_URL || "http://localhost:11000/create")
      }
    ]
  }
};

module.exports = nextConfig;
