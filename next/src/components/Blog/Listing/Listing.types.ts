import type { PortableTextBlock } from 'next-sanity';
import type { BreadcrumbsDataTypes } from '@/components/ui/Breadcrumbs';
import type { BlogPostCardTypes } from '@/components/ui/BlogPostCard';

export type ListingTypes = {
  totalPages?: number;
  currentPage?: number;
  currentCategorySlug?: string;
  breadcrumbs?: BreadcrumbsDataTypes;
  posts: BlogPostCardTypes[];
  categories: {
    name: string;
    path: string;
    postCount: number;
  }[];
  totalPosts: number;
  totalPostsByCategory?: number;
  data: {
    name: string;
    path: string;
    listing: {
      heading: PortableTextBlock[];
      paragraph: PortableTextBlock[];
    };
  };
};
