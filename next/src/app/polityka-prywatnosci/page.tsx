import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/seo/query-metadata';
import BreadcrumbsSchema from '@/global/schema/Breadcrumbs';
import PrivacyPolicySection, {
  type PrivacyPolicySectionTypes,
  PrivacyPolicySectionQuery,
} from '@/components/global/PrivacyPolicySection';
import Components, { ComponentsQuery, type ComponentTypes } from '@/components/Components';

export default async function PrivacyPolicyPage() {
  const { name, path, components, ...data } = await query();
  const breadcrumbsData = [{ name, path }];

  return (
    <>
      <BreadcrumbsSchema data={breadcrumbsData} />
      <PrivacyPolicySection
        {...data}
        breadcrumbs={breadcrumbsData}
      />
      <Components
        data={components}
        hasPreviousSections
      />
    </>
  );
}

const query = async (): Promise<
  { name: string; path: string; components: ComponentTypes[] } & PrivacyPolicySectionTypes
> => {
  const privacyPolicyPageQuery = `
    *[_type == "PrivacyPolicy_Page"][0] {
      name,
      "path": slug.current,
      ${PrivacyPolicySectionQuery},
      ${ComponentsQuery}
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
