/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,
  swcMinify: true,

  pageExtensions: ['page.tsx', 'api.ts'],
  images: {
    domains: [
      'sch.sgp1.cdn.digitaloceanspaces.com',
      'res.cloudinary.com',
      'drive.google.com',
    ],
  },

  // rewrites login to /auth/login & /register  to /auth/register
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/auth/login',
        permanent: false,
      },
      {
        source: '/register',
        destination: '/auth/register',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
