import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/blog/zkemail-audits',
        destination: '/blog/audits',
        permanent: true,
      },
      {
        source: '/blog/audit',
        destination: '/blog/audits',
        permanent: true,
      },
      {
        source: '/blog/recovery',
        destination: '/blog/account-recovery',
        permanent: true,
      },
      {
        source: '/blog/safe',
        destination: '/case-studies/safe-account-recovery',
        permanent: true,
      }, 
      {
        source: '/case-studies/safe',
        destination: '/case-studies/safe-account-recovery',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
