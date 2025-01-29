import { notFound } from 'next/navigation';
import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/seo/query-metadata';
import BreadcrumbsSchema from '@/global/schema/Breadcrumbs';
import Listing, { ListingQuery, type ListingTypes } from '@/components/Blog/Listing';
import { POSTS_PER_PAGE } from '@/global/constants';

export default async function BlogCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dataQuery = await query(`/blog/kategoria/${slug}`);
  const { name, path } = dataQuery.data;

  const breadcrumbsData = [
    { name: 'Blog', path: '/blog' },
    { name, path },
  ];

  return (
    <>
      <BreadcrumbsSchema data={breadcrumbsData} />
      <Listing
        {...dataQuery}
        breadcrumbs={breadcrumbsData}
      />
    </>
  );
}

const query = async (slug: string): Promise<ListingTypes> => {
  const dataQuery = await sanityFetch<ListingTypes>({
    query: ListingQuery({ slug }),
    tags: ['BlogPost_Collection', 'BlogCategory_Collection'],
  });

  if (!dataQuery.totalPostsByCategory || !dataQuery.data) notFound();

  const totalPages = Math.ceil(dataQuery.totalPostsByCategory / POSTS_PER_PAGE);
  return { ...dataQuery, totalPages, currentCategorySlug: slug };
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const path = `/blog/kategoria/${slug}`;
  return await QueryMetadata({
    name: 'BlogCategory_Collection',
    path,
    dynamicSlug: path,
  });
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const data = await sanityFetch<string[]>({
    query:
      '*[_type == "BlogCategory_Collection" && count(*[_type == "BlogPost_Collection" && references(^._id)]) > 0].slug.current',
    tags: ['BlogCategory_Collection', 'BlogPost_Collection'],
  });
  return data.map(slug => ({ slug: slug.split('/')[3] }));
}
