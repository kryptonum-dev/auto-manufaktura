import { notFound } from 'next/navigation';
import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/seo/query-metadata';
import BreadcrumbsSchema from '@/global/schema/Breadcrumbs';
import Components, { ComponentsQuery, type ComponentTypes } from '@/components/Components';

type CarBrandPageTypes = { name: string; path: string; components: ComponentTypes[] };

export default async function CarBrandPage({ params: { slug } }: { params: { slug: string } }) {
  const { name, path, components } = await query(`/marka/${slug}`);
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

const query = async (slug: string): Promise<CarBrandPageTypes> => {
  const data = await sanityFetch<CarBrandPageTypes>({
    query: `
      *[_type == "CarBrand_Collection" && slug.current == $slug][0]{
        name,
        "path": slug.current,
        ${ComponentsQuery}
      }
    `,
    params: { slug },
  });
  if (!data) notFound();
  return data;
};

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
  const path = `/marka/${slug}`;
  return await QueryMetadata({
    name: 'CarBrand_Collection',
    path,
    dynamicSlug: path,
  });
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const data = await sanityFetch<string[]>({
    query: '*[_type == "CarBrand_Collection"].slug.current',
  });

  return data.map(slug => ({ slug: slug.split('/')[2] }));
}
