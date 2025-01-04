import { notFound } from 'next/navigation';
import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/seo/query-metadata';
import BreadcrumbsSchema from '@/global/schema/Breadcrumbs';
import Components, { ComponentsQuery, type ComponentTypes } from '@/components/Components';

type LocationPageTypes = { name: string; path: string; components: ComponentTypes[] };

export default async function LocationPage({ params: { slug } }: { params: { slug: string } }) {
  const { name, path, components } = await query(`/lokalizacja/${slug}`);
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

const query = async (slug: string): Promise<LocationPageTypes> => {
  const data = await sanityFetch<LocationPageTypes>({
    query: `
      *[_type == "Location_Collection" && slug.current == $slug][0]{
        name,
        "path": slug.current,
        ${ComponentsQuery}
      }
    `,
    params: { slug },
    tags: ['Location_Collection'],
  });
  if (!data) notFound();
  return data;
};

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
  const path = `/lokalizacja/${slug}`;
  return await QueryMetadata({
    name: 'Location_Collection',
    path,
    dynamicSlug: path,
  });
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const data = await sanityFetch<string[]>({
    query: '*[_type == "Location_Collection"].slug.current',
    tags: ['Location_Collection'],
  });

  return data.map(slug => ({ slug: slug.split('/')[2] }));
}
