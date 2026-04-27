/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    qualities: [75, 85],
    deviceSizes: [640, 828, 1080, 1280, 1920],
  },
};

export default nextConfig;

