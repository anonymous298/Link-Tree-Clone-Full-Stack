/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // or restrict to "lh3.googleusercontent.com"
      },
    ],
  },
}

export default nextConfig;
