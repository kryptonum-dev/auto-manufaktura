import { ImgDataQuery } from '@/components/ui/Img';
import { ReadingTimeContentQuery } from '../ReadingTime';

import BlogPostCard from './BlogPostCard';
export default BlogPostCard;
export type { BlogPostCardTypes } from './BlogPostCard.types';

export const BlogPostCardQuery = `
  name,
  "path": slug.current,
  ${ImgDataQuery('image')},
  "date": coalesce(publishedAt, _createdAt),
  "readingTimeContent": ${ReadingTimeContentQuery}
`;
