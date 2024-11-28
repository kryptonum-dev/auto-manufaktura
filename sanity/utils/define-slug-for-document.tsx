import { defineField } from 'sanity';
import { slugify } from './slugify';
import { isUniqueSlug } from './is-unique-slug';

type Props = {
  source?: string;
  slug?: string;
  prefix?: string;
  hasPrefixSourceField?: string;
  prefixSource?: string;
};

export const defineSlugForDocument = ({ source, prefix = '', prefixSource, hasPrefixSourceField, slug }: Props) => [
  ...(source
    ? []
    : [
        defineField({
          name: 'name',
          type: 'string',
          title: 'Nazwa',
          description: 'Nazwa dokumentu, używana do wyświetlania w ścieżce lokalizacji (Breadcrumbs).',
          validation: Rule => Rule.required(),
        }),
      ]),
  defineField({
    name: 'slug',
    type: 'slug',
    title: 'Slug',
    description: (
      <>
        Slug to unikalny identyfikator dokumentu, który jest używany w celu optymalizacji pod kątem wyszukiwarek
        internetowych (SEO) oraz w linkach.
        {slug && (
          <>
            <br />
            <strong>
              <em>Ten slug nie może zostać zmieniony.</em>
            </strong>
          </>
        )}
        {!slug && prefix && !prefixSource && (
          <>
            <br />
            Slug powinien zaczynać się od przedrostka: <strong>{prefix}</strong>
          </>
        )}
      </>
    ),
    ...(!!slug && {
      readOnly: true,
      initialValue: { current: slug },
    }),
    options: {
      source: doc => {
        if (slug) return `${slug}`;
        if (source && doc?.[source]) return `${doc[source]}`;
        if (!source && doc?.name) return `${doc.name}`;
        return '';
      },
      slugify: async (slug: string, _, context) => {
        const hasPageRef = !hasPrefixSourceField
          ? true
          : (context?.parent as { [key: string]: boolean })?.[hasPrefixSourceField] || false;
        if (!prefixSource || !hasPageRef) return `${prefix}/${slugify(slug)}`;

        const pageRef = (context.parent as { [key: string]: { _ref: string } })?.[prefixSource]?._ref;
        if (pageRef) {
          const client = context.getClient({ apiVersion: '2024-11-28' });
          const pageSlug = await client.fetch(`*[_id == $ref][0].slug.current`, { ref: pageRef });
          if (pageSlug) return `${pageSlug}/${slugify(slug)}`;
        }

        return `${prefix}/${slugify(slug)}`;
      },
      isUnique: isUniqueSlug,
    },
    validation: Rule => [
      Rule.custom(async (value, context) => {
        const hasPageRef = !hasPrefixSourceField
          ? true
          : (context?.parent as { [key: string]: boolean })?.[hasPrefixSourceField] || false;

        if (!prefixSource || !hasPageRef) return true;

        const pageRef = (context.parent as { [key: string]: { _ref: string } })?.[prefixSource]?._ref;
        if (!pageRef) return `Aby ustawić prefix do sluga, należy wskazać stronę nadrzędną`;

        const client = context.getClient({ apiVersion: '2024-11-28' });
        const pageSlug = await client.fetch(`*[_id == $ref][0].slug.current`, { ref: pageRef });
        if (!pageSlug) return 'Strona nadrzędna musi posiadać slug';

        if (value?.current && !value?.current?.startsWith(pageSlug))
          return `Slug powinien zaczynać się od sluga strony nadrzędnej (${pageSlug})`;

        if (
          value?.current &&
          value.current.replace(pageSlug, '') !== `/${slugify(value.current.replace(pageSlug, ''))}`
        )
          return 'Nieprawidłowy slug. Pamiętaj, że slug może zawierać jedynie małe litery, cyfry i myślniki, a także powinien zaczynać się od znaku "/".';

        return true;
      }),
      Rule.custom((value, context) => {
        const hasPageRef = !hasPrefixSourceField
          ? true
          : (context?.parent as { [key: string]: boolean })?.[hasPrefixSourceField] || false;
        if (prefixSource && hasPageRef) return true;

        if (prefix && value?.current && !value.current.startsWith(prefix))
          return `Slug powinien zaczynać się od ${prefix}`;

        if (value?.current && value.current.replace(prefix, '') !== `/${slugify(value.current.replace(prefix, ''))}`) {
          return 'Nieprawidłowy slug. Pamiętaj, że slug może zawierać jedynie małe litery, cyfry i myślniki, a także powinien zaczynać się od znaku "/".';
        }

        return true;
      }),
      Rule.required().error('Slug jest wymagany'),
      Rule.custom((value, context) => {
        if (!value?.current || slug) return true;

        const sourceField = source || 'name';
        const sourceValue = (context.parent as { [key: string]: string })?.[sourceField];

        if (sourceValue && !value?.current?.includes(slugify(sourceValue)))
          return 'Slug nie pasuje do nazwy. Sprawdź, czy jest poprawny.';

        return true;
      }).warning(),
    ],
  }),
];
