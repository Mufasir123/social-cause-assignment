/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: {
        bodySizeLimit: '100mb' // You can increase this to 10mb, 20mb, etc.
      }
    }
  }

export default nextConfig;
