import { notFound, redirect } from 'next/navigation';
import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/seo/query-metadata';
import BreadcrumbsSchema from '@/global/schema/Breadcrumbs';
import { POSTS_PER_PAGE } from '@/global/constants';
import Listing, { ListingQuery, type ListingTypes } from '@/components/Blog/Listing';

export default async function BlogCategoryPaginationPage({
  params: { slug, page },
}: {
  params: { slug: string; page: string };
}) {
  const currentPage = parseInt(page);

  if (!currentPage) notFound();
  if (currentPage === 1) redirect(`/blog/kategoria/${slug}`);

  const dataQuery = await query(currentPage, `/blog/kategoria/${slug}`);
  const { name, path } = dataQuery.data;

  const breadcrumbsData = [
    { name: 'Blog', path: '/blog' },
    { name, path },
    { name: `Strona ${currentPage}`, path: `${path}/strona/${currentPage}` },
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

const query = async (page: number, slug: string): Promise<ListingTypes> => {
  const dataQuery = await sanityFetch<ListingTypes>({
    query: ListingQuery({ page, slug }),
    tags: ['BlogPost_Collection', 'BlogCategory_Collection'],
  });

  if (!dataQuery.totalPostsByCategory || !dataQuery.data) notFound();
  const totalPages = Math.ceil(dataQuery.totalPostsByCategory / POSTS_PER_PAGE);

  if (page > totalPages) notFound();
  return { ...dataQuery, totalPages, currentCategorySlug: slug, currentPage: page };
};

export async function generateMetadata({ params: { page, slug } }: { params: { page: string; slug: string } }) {
  const currentPage = parseInt(page);
  const path = `/blog/kategoria/${slug}`;
  return await QueryMetadata({
    name: 'BlogCategory_Collection',
    path: currentPage === 1 ? path : `${path}/strona/${currentPage}`,
    dynamicSlug: path,
    titleSuffix: currentPage === 1 ? '' : ` | Strona ${currentPage}`,
  });
}

export async function generateStaticParams(): Promise<{ slug: string; page: string }[]> {
  const data = await sanityFetch<{ slug: string; postCount: number }[]>({
    query: `
      *[_type == 'BlogCategory_Collection' && count(*[_type == "BlogPost_Collection" && references(^._id)]) > 0] {
        "slug": slug.current,
        "postCount": count(*[_type == "BlogPost_Collection" && references(^._id)]),
      }
    `,
    tags: ['BlogCategory_Collection', 'BlogPost_Collection'],
  });

  return data.flatMap(({ slug, postCount }) => {
    const totalPages = Math.ceil(postCount / POSTS_PER_PAGE);
    return Array.from({ length: totalPages - 1 }, (_, i) => ({
      slug: slug.split('/')[3],
      page: (i + 2).toString(),
    }));
  });
}
