import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/seo/query-metadata';
import BreadcrumbsSchema from '@/global/schema/Breadcrumbs';
import Listing, { ListingQuery, type ListingTypes } from '@/components/Blog/Listing';
import { POSTS_PER_PAGE } from '@/global/constants';

export default async function BlogPage() {
  const dataQuery = await query();
  const { name, path } = dataQuery.data;
  const breadcrumbsData = [{ name, path }];

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

const query = async (): Promise<ListingTypes> => {
  const data = await sanityFetch<ListingTypes>({
    query: ListingQuery({}),
    tags: ['BlogPost_Collection', 'BlogCategory_Collection', 'Blog_Page'],
  });

  const totalPages = Math.ceil(data.totalPosts / POSTS_PER_PAGE);
  return { ...data, totalPages };
};

export async function generateMetadata() {
  return await QueryMetadata({
    name: 'Blog_Page',
    path: '/blog',
  });
}
