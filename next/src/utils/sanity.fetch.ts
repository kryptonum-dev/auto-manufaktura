'use server';
import { createClient, type QueryParams } from 'next-sanity';
import { isProductionDeployment } from './is-production-deployment';

const projectId = process.env.SANITY_PROJECT_ID;
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  throw new Error('The `SANITY_API_TOKEN` environment variable is required.');
}

const client = createClient({
  projectId,
  dataset: 'production',
  apiVersion: '2024-11-28',
  useCdn: false,
  perspective: isProductionDeployment ? 'published' : 'previewDrafts',
  token,
});

/**
 * Performs a Sanity query in GROQ for fetching data.
 * @param {string} query - The GROQ query.
 * @param {string[]} [tags] - Recommended. The tags for Next Caching.
 * @param {QueryParams} [params={}] - Optional. Used to query dynamic pages, like blog posts.
 * @returns {Promise<QueryResponse>} Returns a promise of the SEO object.
 */
export default async function sanityFetch<QueryResponse>({
  query,
  tags,
  params = {},
}: {
  query: string;
  tags?: string[];
  params?: QueryParams;
}): Promise<QueryResponse> {
  return await client.fetch<QueryResponse>(query, params,
    {
      ...(isProductionDeployment)
        ? { cache: 'force-cache', next: { tags: tags || [] } }
        : { cache: 'no-store' }
    }
  );
}
