import { notFound } from 'next/navigation';
import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/seo/query-metadata';
import BreadcrumbsSchema from '@/global/schema/Breadcrumbs';
import Components, { ComponentsQuery, type ComponentTypes } from '@/components/Components';

type ServicePageTypes = {
  name: string;
  path: string;
  parentPage?: {
    name: string;
    path: string;
  };
  components: ComponentTypes[];
};

export default async function ServicePage({ params: { slug } }: { params: { slug: string[] } }) {
  const { name, path, parentPage, components } = await query(`/usluga/${slug.join('/')}`);
  const breadcrumbsData = [...(parentPage ? [{ name: parentPage.name, path: parentPage.path }] : []), { name, path }];

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
        },
        ${ComponentsQuery}
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

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  const data = await sanityFetch<string[]>({
    query: '*[_type == "Service_Collection"].slug.current',
  });

  return data.map(slug => ({ slug: slug.split('/').slice(2) }));
}
