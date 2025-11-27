/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'bc-user-uploads.brandcrowd.com' },
    ],
  },
};
module.exports = nextConfig;
