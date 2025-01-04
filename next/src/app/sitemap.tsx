import type { MetadataRoute } from 'next';
import { DOMAIN } from '@/global/constants';
import sanityFetch from '@/utils/sanity.fetch';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = [
    ...(await sanityFetch<string[]>({
      query: '*[defined(slug.current)].slug.current',
      tags: [
        'Index_Page',
        'NotFound_Page',
        'Pricing_Page',
        'Contact_Page',
        'About_Page',
        'Career_Page',
        'Blog_Page',
        'PrivacyPolicy_Page',
        'BlogPost_Collection',
        'BlogCategory_Collection',
        'Location_Collection',
        'CarBrand_Collection',
        'Service_Collection',
      ],
    })),
    ...(
      await Promise.all([
        import('./blog/(posts)/strona/[page]/page')
          .then(res => res.generateStaticParams())
          .then(paths => paths.map(path => `/blog/strona/${path.page}`)),
        import('./blog/(posts)/kategoria/[slug]/strona/[page]/page')
          .then(res => res.generateStaticParams())
          .then(paths => paths.map(path => `/blog/kategoria/${path.slug}/strona/${path.page}`)),
      ])
    ).flat(),
  ];

  return slugs.map(slug => ({ url: `${DOMAIN}${slug}` }));
}
