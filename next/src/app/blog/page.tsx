import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/seo/query-metadata';
import BreadcrumbsSchema from '@/global/schema/Breadcrumbs';
import Components, { ComponentsQuery, type ComponentTypes } from '@/components/Components';

export default async function BlogPage() {
  const { components, name, slug } = await query();
  const breadcrumbsData = [{ name, path: slug }];

  return (
    <>
      <BreadcrumbsSchema data={breadcrumbsData} />
      <Components
        data={components}
        hasPreviousSections={true}
      />
    </>
  );
}

const query = async (): Promise<{ components: ComponentTypes[]; name: string; slug: string }> => {
  return await sanityFetch({
    query: `
      *[_type == "Blog_Page"][0] {
        name,
        "slug": slug.current,
        ${ComponentsQuery}
      }
    `,
  });
};

export async function generateMetadata() {
  return await QueryMetadata({
    name: 'Blog_Page',
    path: '/blog',
  });
}
