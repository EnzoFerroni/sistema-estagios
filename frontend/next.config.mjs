/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://psychic-fishstick-w6ppqw44wrjhxpp-8080.app.github.dev/:path*',
      },
    ];
  },
};

export default nextConfig;
