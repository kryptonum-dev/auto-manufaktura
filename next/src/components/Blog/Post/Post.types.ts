import type { PortableTextBlock } from 'next-sanity';
import type { BreadcrumbsDataTypes } from '@/components/ui/Breadcrumbs';
import type { ContentTypes } from './Content';

export type PostTypes = {
  breadcrumbs?: BreadcrumbsDataTypes;
  heading: PortableTextBlock[];
  paragraph?: PortableTextBlock[];
  postHeadings?: PortableTextBlock[][];
  content: ContentTypes;
};
