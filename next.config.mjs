import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));
const nextConfig = {
  images: { unoptimized: true },
  webpack: (config) => { config.resolve.alias['@'] = root; return config; },
};
export default nextConfig;
