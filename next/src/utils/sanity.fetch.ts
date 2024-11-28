'use server';
import { createClient, type QueryParams } from 'next-sanity';
import { isPreviewDeployment } from './is-preview-deployment';

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
  perspective: isPreviewDeployment ? 'previewDrafts' : 'published',
  token,
});

export default async function sanityFetch<QueryResponse>({
  query,
  params = {},
}: {
  query: string;
  params?: QueryParams;
}): Promise<QueryResponse> {
  return await client.fetch<QueryResponse>(query, params);
}
