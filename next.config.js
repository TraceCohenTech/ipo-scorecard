/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://valueaddvc.com https://*.valueaddvc.com https://*.vercel.app",
          },
          { key: "X-Frame-Options", value: "ALLOWALL" },
        ],
      },
    ];
  },
};
module.exports = nextConfig;
