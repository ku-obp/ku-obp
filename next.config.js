/** @type {import('next').NextConfig} */

const {
  sockDest, createDest
} = ((serverURL, localhost) => {
  const url = serverURL ?? localhost
  const sockDest = `${url}/socket.io/`
  const createDest = `${url}/create`
  return {sockDest, createDest}
})(process.env.NEXT_PUBLIC_TWO_WORLDS_SOCKET_URL, "http://localhost:11000")

const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/game/two-worlds/room/create",
        destination: createDest
      },
      {
        source: "/socket.io",
        destination: sockDest
      }
    ]
  }
};

module.exports = nextConfig;
