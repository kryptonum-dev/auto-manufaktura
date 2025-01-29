import { notFound } from 'next/navigation';
import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/seo/query-metadata';
import BreadcrumbsSchema from '@/global/schema/Breadcrumbs';
import Components, { ComponentsQuery, type ComponentTypes } from '@/components/Components';

type CarBrandPageTypes = { name: string; path: string; components: ComponentTypes[] };

export default async function CarBrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
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
    tags: ['CarBrand_Collection'],
  });
  if (!data) notFound();
  return data;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
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
    tags: ['CarBrand_Collection'],
  });

  return data.map(slug => ({ slug: slug.split('/')[2] }));
}
