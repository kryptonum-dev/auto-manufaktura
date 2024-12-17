import { BreadcrumbsDataTypes } from '@/components/ui/Breadcrumbs';
import type { PortableTextBlock } from 'next-sanity';

export type ListingTypes = {
  totalPages?: number;
  currentPage?: number;
  currentCategorySlug?: string;
  breadcrumbs?: BreadcrumbsDataTypes;
  posts: {
    name: string;
    path: string;
  }[];
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
