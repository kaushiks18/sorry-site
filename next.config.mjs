/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Add basePath for GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/sorry-site' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/sorry-site/' : '',
  distDir: 'out',
};

export default nextConfig;
