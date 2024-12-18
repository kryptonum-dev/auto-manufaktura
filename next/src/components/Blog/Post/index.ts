import { PortableTextQuery } from '@/components/ui/TextBlock';
import { ContentQuery } from './Content';

import Post from './Post';
export default Post;
export type { PostTypes } from './Post.types';

export const PostQuery = `
  ${PortableTextQuery('heading')},
  ${PortableTextQuery('paragraph')},
  "postHeadings": content[style == "h2"],
  "content": {
    ${ContentQuery}
  }
`;
