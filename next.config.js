/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // For covers and thumbnails (full paths allowed)
      {
        protocol: 'https',
        hostname: 'uploads.mangadex.org',
        pathname: '/covers/**',  // Matches /covers/... (e.g., your URL)
      },
      // For chapter pages (wildcard for rotating subdomains)
      {
        protocol: 'https',
        hostname: '**.mangadex.network',
        pathname: '/data/**',  // Matches /data/... chapter paths
      },
    ],
  },
};

module.exports = nextConfig;