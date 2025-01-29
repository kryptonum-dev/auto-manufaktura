import { createClient } from 'next-sanity';

const projectId = process.env.SANITY_PROJECT_ID;
const TOKEN = process.env.SANITY_API_TOKEN;

if (!TOKEN) throw new Error('The `SANITY_API_TOKEN` environment variable is required.');

const client = createClient({
  projectId,
  dataset: 'production',
  apiVersion: '2025-01-05',
  useCdn: false,
  token: TOKEN,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '**',
      },
    ],
  },
  async redirects() {
    const data = await client.fetch(`
      *[_type == "redirects"][0].redirects {
        "source": source.current,
        "destination": destination.current,
        "permanent": isPermanent,
      }[]
    `, {}, { next: { tags: ['redirects'] } });
    return data ?? [];
  },
};

export default nextConfig;
