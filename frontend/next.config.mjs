/** @type {import('next').NextConfig} */
import { resolve } from 'path';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ["final_alx_project/frontend/src/app/icons/"], 
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/api/:path*", // Replace 'http://localhost:3001' with your actual backend server URL
      },
    ];
  },
  // ... other configuration ...
  compiler: {
    styledComponents: true,
  },
  // No longer need experimental.appDir as it's enabled by default
  // experimental: {
  //   appDir: true,
  // },
  reactRoot: "concurrent", // Moved outside experimental 
  // Include this block for the '@' alias 
  // This will allow you to import files with a shorter path
  // using `@` at the beginning of your import statements
  // Example: import { cn } from '@/lib/utils';
  webpack: (config, { isServer }) => { // Moved outside experimental 
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": resolve(__dirname), // Use 'resolve' from 'path' to get the absolute path
      };
    }

    return config;
  },
};

export default nextConfig;