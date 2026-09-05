/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
  async redirects() {
    return [
      // Consolidate SEO onto one canonical domain — the old .vercel.app
      // deployment URL always keeps working (Vercel never disables it), so
      // without this, Google would see the same content live at two
      // different URLs. A permanent redirect keeps everything (search
      // rankings, old links, bookmarks) pointing at digitalailearning.in.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'digitalai-learning-institute-alpha.vercel.app' }],
        destination: 'https://digitalailearning.in/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
