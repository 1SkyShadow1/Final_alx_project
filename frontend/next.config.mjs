import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

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
  webpack(config, {buildId, dev, isServer, defaultLoaders, webpack}) {
  config.resolve.alias['@'] = resolve(__dirname, 'src/');
  return config;
  },  
};

export default nextConfig;