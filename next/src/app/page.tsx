import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/seo/query-metadata';
import BreadcrumbsSchema from '@/global/schema/Breadcrumbs';
import Components, { ComponentsQuery, type ComponentTypes } from '@/components/Components';

export default async function IndexPage() {
  const { components } = await query();
  return (
    <>
      <BreadcrumbsSchema />
      <Components data={components} />
    </>
  );
}

const query = async (): Promise<{ components: ComponentTypes[] }> => {
  return await sanityFetch({
    query: `
      *[_type == "Index_Page"][0] {
        ${ComponentsQuery}
      }
    `,
  });
};

export async function generateMetadata() {
  return await QueryMetadata({
    name: 'Index_Page',
    path: '',
  });
}
