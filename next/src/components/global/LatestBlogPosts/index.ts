import { PortableTextQuery } from '@/components/ui/TextBlock';
import { ButtonDataQuery } from '@/components/ui/Button';
import { BlogPostCardQuery } from '@/components/ui/BlogPostCard';

import LatestBlogPosts from './LatestBlogPosts';
export default LatestBlogPosts;
export type { LatestBlogPostsTypes } from './LatestBlogPosts.types';

export const LatestBlogPostsQuery = `
  _type == "LatestBlogPosts" => {
    ${ButtonDataQuery('cta')},
    ${PortableTextQuery('heading')},
    ${PortableTextQuery('paragraph')},
    "posts": select(posts != null => 
      posts[]->{
        ${BlogPostCardQuery}
      },
      *[_type == "BlogPost_Collection"] | order(coalesce(publishedAt, _createdAt) desc) [0...3]{
        ${BlogPostCardQuery}
      }
    )
  },
`;
