import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/seo/query-metadata';
import BreadcrumbsSchema from '@/global/schema/Breadcrumbs';
import Components, { ComponentsQuery, type ComponentTypes } from '@/components/Components';

export default async function PricingPage() {
  const { components, name, path } = await query();
  const breadcrumbsData = [{ name, path }];

  return (
    <>
      <BreadcrumbsSchema data={breadcrumbsData} />
      <Components
        data={components}
        breadcrumbs={breadcrumbsData}
      />
    </>
  );
}

const query = async (): Promise<{ components: ComponentTypes[]; name: string; path: string }> => {
  return await sanityFetch({
    query: `
      *[_type == "Pricing_Page"][0] {
        name,
        "path": slug.current,
        ${ComponentsQuery}
      }
    `,
    tags: ['Pricing_Page'],
  });
};

export async function generateMetadata() {
  return await QueryMetadata({
    name: 'Pricing_Page',
    path: '/cennik',
  });
}
