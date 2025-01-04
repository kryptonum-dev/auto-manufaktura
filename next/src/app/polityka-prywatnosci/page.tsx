import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/seo/query-metadata';
import BreadcrumbsSchema from '@/global/schema/Breadcrumbs';
import PrivacyPolicySection, {
  type PrivacyPolicySectionTypes,
  PrivacyPolicySectionQuery,
} from '@/components/global/PrivacyPolicySection';

export default async function PrivacyPolicyPage() {
  const { name, path, content } = await query();
  const breadcrumbsData = [{ name, path }];

  return (
    <>
      <BreadcrumbsSchema data={breadcrumbsData} />
      <PrivacyPolicySection
        {...content}
        breadcrumbs={breadcrumbsData}
      />
    </>
  );
}

const query = async (): Promise<{ name: string; path: string; content: PrivacyPolicySectionTypes }> => {
  const privacyPolicyPageQuery = `
    *[_type == "PrivacyPolicy_Page"][0] {
      name,
      "path": slug.current,
      "content": {
        ${PrivacyPolicySectionQuery}
      }
    }
  `;

  return await sanityFetch({ query: privacyPolicyPageQuery, tags: ['PrivacyPolicy_Page'] });
};

export async function generateMetadata() {
  return await QueryMetadata({
    name: 'PrivacyPolicy_Page',
    path: '/polityka-prywatnosci',
  });
}
