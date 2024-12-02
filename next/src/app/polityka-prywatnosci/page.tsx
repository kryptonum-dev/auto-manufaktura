import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/seo/query-metadata';
import PrivacyPolicySection, {
  type PrivacyPolicySectionTypes,
  PrivacyPolicySectionQuery,
} from '@/components/global/PrivacyPolicySection';

export default async function PrivacyPolicyPage() {
  const { name, slug, content } = await query();

  return (
    <PrivacyPolicySection
      {...content}
      breadcrumbs={[{ name, path: slug }]}
    />
  );
}

const query = async (): Promise<{ name: string; slug: string; content: PrivacyPolicySectionTypes }> => {
  const privacyPolicyPageQuery = `
    *[_type == "PrivacyPolicy_Page"][0] {
      name,
      "slug": slug.current,
      "content": {
        ${PrivacyPolicySectionQuery}
      }
    }
  `;

  return await sanityFetch({ query: privacyPolicyPageQuery });
};

export async function generateMetadata() {
  return await QueryMetadata({
    name: 'PrivacyPolicy_Page',
    path: '/polityka-prywatnosci',
  });
}
