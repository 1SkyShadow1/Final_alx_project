import { fileURLToPath } from 'url';
import { dirname } from 'path';

// If you're using __dirname in parts not shown, define it like this:
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ["final_alx_project/frontend/src/app/icons/"],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/api/:path*", // Adjust the destination as needed
      },
    ];
  },
  compiler: {
    styledComponents: true,
  },
  // Ensure any experimental features are correctly configured or removed if not needed
  // experimental: {
  //   appDir: true, // Uncomment and adjust if you're using experimental features
  // },
};

export default nextConfig;