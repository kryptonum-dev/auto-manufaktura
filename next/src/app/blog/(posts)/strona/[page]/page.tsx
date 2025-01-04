import { notFound, redirect } from 'next/navigation';
import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/seo/query-metadata';
import { POSTS_PER_PAGE } from '@/global/constants';
import Listing, { ListingQuery, type ListingTypes } from '@/components/Blog/Listing';
import BreadcrumbsSchema from '@/global/schema/Breadcrumbs';

export default async function BlogPaginationPage({ params: { page } }: { params: { page: string } }) {
  const currentPage = parseInt(page);

  if (!currentPage) notFound();
  if (currentPage === 1) redirect('/blog');

  const dataQuery = await query(currentPage);
  const { name, path } = dataQuery.data;

  const breadcrumbsData = [
    { name, path },
    { name: `Strona ${currentPage}`, path: `/blog/strona/${currentPage}` },
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

const query = async (page: number): Promise<ListingTypes> => {
  const data = await sanityFetch<ListingTypes>({
    query: ListingQuery({ page }),
    tags: ['BlogPost_Collection', 'BlogCategory_Collection', 'Blog_Page'],
  });

  const totalPages = Math.ceil(data.totalPosts / POSTS_PER_PAGE);
  if (page > totalPages || !data.posts || data.posts.length === 0) notFound();

  return { ...data, totalPages, currentPage: page };
};

export async function generateMetadata({ params: { page } }: { params: { page: string } }) {
  const currentPage = parseInt(page);
  return await QueryMetadata({
    name: 'Blog_Page',
    path: currentPage === 1 ? '/blog' : `/blog/strona/${currentPage}`,
    titleSuffix: currentPage === 1 ? '' : ` | Strona ${currentPage}`,
  });
}

export async function generateStaticParams(): Promise<{ page: string }[]> {
  const totalPosts = await sanityFetch<number>({
    query: `count(*[_type == "BlogPost_Collection"])`,
    tags: ['BlogPost_Collection'],
  });

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: (i + 2).toString(),
  }));
}
