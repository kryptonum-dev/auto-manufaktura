import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/seo/query-metadata';
import Listing, { ListingQuery, type ListingTypes } from '@/components/Career/Listing';
import BreadcrumbsSchema from '@/global/schema/Breadcrumbs';
import Components, { ComponentsQuery, type ComponentTypes } from '@/components/Components';

export default async function CareerPage() {
  const { components, name, slug, ...data } = await query();
  const breadcrumbsData = [{ name, path: slug }];

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

const query = async (): Promise<{ components: ComponentTypes[]; name: string; slug: string } & ListingTypes> => {
  return await sanityFetch({
    query: `
      *[_type == "Career_Page"][0] {
        name,
        "slug": slug.current,
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
