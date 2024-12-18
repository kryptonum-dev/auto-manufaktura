import type { PortableTextBlock } from 'next-sanity';
import type { ButtonDataTypes } from '@/components/ui/Button';
import type { BlogPostCardTypes } from '@/components/ui/BlogPostCard';

export type LatestBlogPostsTypes = {
  index: number;
  cta: ButtonDataTypes;
  heading: PortableTextBlock[];
  paragraph?: PortableTextBlock[];
  posts?: BlogPostCardTypes[];
};
