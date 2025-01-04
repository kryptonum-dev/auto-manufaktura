import sanityFetch from '@/utils/sanity.fetch';
import Components, { ComponentsQuery, type ComponentTypes } from '@/components/Components';

export default async function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { components } = await query();

  return (
    <>
      {children}
      <Components
        data={components}
        hasPreviousSections
      />
    </>
  );
}

const query = async (): Promise<{ components: ComponentTypes[] }> => {
  return await sanityFetch({
    query: `
        *[_type == "Blog_Page"][0] {
          ${ComponentsQuery}
        }
      `,
    tags: ['Blog_Page'],
  });
};
