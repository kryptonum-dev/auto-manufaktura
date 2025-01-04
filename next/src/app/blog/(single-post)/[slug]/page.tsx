import { notFound } from 'next/navigation';
import sanityFetch from '@/utils/sanity.fetch';
import { QueryMetadata } from '@/global/seo/query-metadata';
import BreadcrumbsSchema from '@/global/schema/Breadcrumbs';
import Components, { ComponentsQuery, type ComponentTypes } from '@/components/Components';
import Post, { type PostTypes, PostQuery } from '@/components/Blog/Post';

type BlogPostPageTypes = {
  name: string;
  path: string;
  components: ComponentTypes[];
  post: PostTypes;
};

export default async function BlogPostPage({ params: { slug } }: { params: { slug: string } }) {
  const { name, path, components, post } = await query(`/blog/${slug}`);
  const breadcrumbsData = [
    { name: 'Blog', path: '/blog' },
    { name, path },
  ];

  return (
    <>
      <BreadcrumbsSchema data={breadcrumbsData} />
      <Post
        {...post}
        breadcrumbs={breadcrumbsData}
      />
      <Components
        data={components}
        hasPreviousSections
      />
    </>
  );
}

const query = async (slug: string): Promise<BlogPostPageTypes> => {
  const data = await sanityFetch<BlogPostPageTypes>({
    query: `
      *[_type == "BlogPost_Collection" && slug.current == $slug][0]{
        name,
        "path": slug.current,
        ${ComponentsQuery},
        "post": {
          ${PostQuery}
        }
      }
    `,
    params: { slug },
    tags: ['BlogPost_Collection'],
  });
  if (!data) notFound();
  return data;
};

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
  const path = `/blog/${slug}`;
  return await QueryMetadata({
    name: 'BlogPost_Collection',
    path,
    dynamicSlug: path,
  });
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const data = await sanityFetch<string[]>({
    query: '*[_type == "BlogPost_Collection"].slug.current',
    tags: ['BlogPost_Collection'],
  });

  return data.map(slug => ({ slug: slug.split('/')[2] }));
}
