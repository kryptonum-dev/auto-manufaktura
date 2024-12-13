import { DOMAIN } from '../constants';

type BreadcrumbsSchemaTypes = {
  data?: {
    name: string;
    path: string;
  }[];
};

export default function BreadcrumbsSchema({ data = [] }: BreadcrumbsSchemaTypes) {
  const breadcrumbsData = [{ name: 'Strona główna', path: '/' }, ...data];

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbsData.map(({ name, path }, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: name,
            item: `${DOMAIN}${path}`,
          })),
        }),
      }}
    />
  );
}
