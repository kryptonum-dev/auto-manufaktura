import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/seo/query-metadata';
import Listing, { ListingQuery, type ListingTypes } from '@/components/Career/Listing';
import Components, { ComponentsQuery, type ComponentTypes } from '@/components/Components';

export default async function CareerPage() {
  const { components, name, ...data } = await query();

  return (
    <>
      <Listing
        {...data}
        breadcrumbs={{ data: [{ name, path: '/rekrutacja' }], visible: true }}
      />
      <Components
        hasPreviousSections
        data={components}
      />
    </>
  );
}

const query = async (): Promise<{ components: ComponentTypes[]; name: string } & ListingTypes> => {
  return await sanityFetch({
    query: `
      *[_type == "Career_Page"][0] {
        name,
        ${ListingQuery}
        ${ComponentsQuery}
      }
    `,
  });
};

export async function generateMetadata() {
  return await QueryMetadata({
    name: 'Career_Page',
    path: '/rekrutacja',
  });
}
