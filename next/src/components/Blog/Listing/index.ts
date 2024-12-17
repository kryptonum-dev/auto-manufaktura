import { PortableTextQuery } from '@/components/ui/TextBlock';
import { POSTS_PER_PAGE } from '@/global/constants';

import Listing from './Listing';
export default Listing;
export type { ListingTypes } from './Listing.types';

export const ListingQuery = ({ slug = '', page = 1 }: { slug?: string; page?: number }) => {
  const OFFSET = POSTS_PER_PAGE * (page - 1);
  const START = OFFSET;
  const END = OFFSET + POSTS_PER_PAGE;

  return `
  {
    "posts": *[_type == "BlogPost_Collection"${slug ? ` && category->slug.current == "${slug}"` : ''}] | order(_createdAt desc) [${START}...${END}] {
      name,
      "path": slug.current
    },
    "categories": *[_type == "BlogCategory_Collection" && count(*[_type == "BlogPost_Collection" && references(^._id)]) > 0]{
      name,
      "path": slug.current,
      "postCount": count(*[_type == "BlogPost_Collection" && references(^._id)])
    },
    "totalPosts": count(*[_type == "BlogPost_Collection"]),
    "data": *[_type == ${slug ? `"BlogCategory_Collection" && slug.current == "${slug}"` : `"Blog_Page"`}][0]{
      name,
      "path": slug.current,
      listing {
        ${PortableTextQuery('heading')},
        ${PortableTextQuery('paragraph')}
      }
    },
    ${slug ? `"totalPostsByCategory": count(*[_type == "BlogPost_Collection" && category->slug.current == "${slug}"])` : ''}
  }
  `;
};
