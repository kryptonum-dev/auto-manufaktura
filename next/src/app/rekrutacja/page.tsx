import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/seo/query-metadata';
import Listing, { ListingQuery, type ListingTypes } from '@/components/Career/Listing';
import BreadcrumbsSchema from '@/global/schema/Breadcrumbs';
import Components, { ComponentsQuery, type ComponentTypes } from '@/components/Components';

export default async function CareerPage() {
  const { components, name, path, ...data } = await query();
  const breadcrumbsData = [{ name, path }];

  return (
    <>
      <BreadcrumbsSchema data={breadcrumbsData} />
      <Listing
        {...data}
        breadcrumbs={breadcrumbsData}
      />
      <Components
        hasPreviousSections
        data={components}
      />
    </>
  );
}

const query = async (): Promise<{ components: ComponentTypes[]; name: string; path: string } & ListingTypes> => {
  return await sanityFetch({
    query: `
      *[_type == "Career_Page"][0] {
        name,
        "path": slug.current,
        ${ListingQuery}
        ${ComponentsQuery}
      }
    `,
    tags: ['Career_Page'],
  });
};

export async function generateMetadata() {
  return await QueryMetadata({
    name: 'Career_Page',
    path: '/rekrutacja',
  });
}
