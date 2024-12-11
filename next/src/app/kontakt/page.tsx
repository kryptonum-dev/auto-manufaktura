import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/seo/query-metadata';
import Components, { ComponentsQuery, type ComponentTypes } from '@/components/Components';

export default async function ContactPage() {
  const { components, name } = await query();

  return (
    <Components
      data={components}
      breadcrumbs={{ data: [{ name, path: '/kontakt' }], visible: true }}
    />
  );
}

const query = async (): Promise<{ components: ComponentTypes[]; name: string }> => {
  return await sanityFetch({
    query: `
      *[_type == "Contact_Page"][0] {
        name,
        ${ComponentsQuery}
      }
    `,
  });
};

export async function generateMetadata() {
  return await QueryMetadata({
    name: 'Contact_Page',
    path: '/kontakt',
  });
}
