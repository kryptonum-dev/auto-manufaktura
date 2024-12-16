import { notFound } from 'next/navigation';
import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/seo/query-metadata';
import BreadcrumbsSchema from '@/global/schema/Breadcrumbs';

export default async function Service_Page({ params: { slug } }: { params: { slug: string[] } }) {
  const { name, path, parentPage } = await query(`/usluga/${slug.join('/')}`);
  const breadcrumbsData = [...(parentPage ? [{ name: parentPage.name, path: parentPage.path }] : []), { name, path }];

  return (
    <>
      <BreadcrumbsSchema data={breadcrumbsData} />
    </>
  );
}

type ServicePageTypes = {
  name: string;
  path: string;
  parentPage?: {
    name: string;
    path: string;
  };
};

const query = async (slug: string): Promise<ServicePageTypes> => {
  const data = await sanityFetch<ServicePageTypes>({
    query: `
      *[_type == "Service_Collection" && slug.current == $slug][0]{
        name,
        "path": slug.current,
        isSubPage => {
          parentPage->{
            name, 
            "path": slug.current
          }
        }
      }
    `,
    params: { slug },
  });
  if (!data) notFound();
  return data;
};

export async function generateMetadata({ params: { slug } }: { params: { slug: string[] } }) {
  const path = `/usluga/${slug.join('/')}`;
  return await QueryMetadata({
    name: 'Service_Collection',
    path,
    dynamicSlug: path,
  });
}

export async function generateStaticParams() {
  const data = await sanityFetch<string[]>({
    query: '*[_type == "Service_Collection"].slug.current',
  });
  return data.map(slug => ({ slug: slug.split('/').slice(2) }));
}
