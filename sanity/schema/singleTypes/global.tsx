import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'global',
  type: 'document',
  title: 'Ustawienia globalne',
  icon: () => '🌍',
  fields: [
    defineField({
      name: 'socials',
      type: 'object',
      title: 'Social media',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'facebook',
          type: 'url',
          title: 'Facebook',
          validation: Rule =>
            Rule.uri({ scheme: ['https'] }).error('Podaj prawidłowy adres URL (rozpoczynający się od https://)'),
        }),
        defineField({
          name: 'instagram',
          type: 'url',
          title: 'Instagram',
          validation: Rule =>
            Rule.uri({ scheme: ['https'] }).error('Podaj prawidłowy adres URL (rozpoczynający się od https://)'),
        }),
        defineField({
          name: 'youtube',
          type: 'url',
          title: 'YouTube',
          validation: Rule =>
            Rule.uri({ scheme: ['https'] }).error('Podaj prawidłowy adres URL (rozpoczynający się od https://)'),
        }),
        defineField({
          name: 'tiktok',
          type: 'url',
          title: 'TikTok',
          validation: Rule =>
            Rule.uri({ scheme: ['https'] }).error('Podaj prawidłowy adres URL (rozpoczynający się od https://)'),
        }),
        defineField({
          name: 'linkedin',
          type: 'url',
          title: 'Linkedin',
          validation: Rule =>
            Rule.uri({ scheme: ['https'] }).error('Podaj prawidłowy adres URL (rozpoczynający się od https://)'),
        }),
      ],
    }),
    defineField({
      name: 'seo',
      type: 'object',
      title: 'SEO',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'og_img',
          type: 'image',
          title: 'OG Image',
          description:
            'Social Share Image to zdjęcie, które pojawia się np. podczas udostępniania linku w mediach społecznościowych. Wymiary obrazu powinny wynosić 1200x630px. Dla maksymalnej kompatybilności należy używać formatów JPG lub PNG, ponieważ format WebP nie jest obsługiwany we wszystkich miejscach.',
        }),
      ],
    }),
    defineField({
      name: 'OrganizationSchema',
      type: 'object',
      title: 'Uporządkowane dane organizacji',
      description: (
        <>
          Więcej informacji o{' '}
          <a
            href='https://developers.google.com/search/docs/appearance/structured-data/organization?hl=en'
            target='_blank'
            rel='noreferrer'
          >
            Schema
          </a>
        </>
      ),
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'name',
          type: 'string',
          title: 'Nazwa',
          description: 'Wpisz nazwę swojej organizacji tak, jak ma się ona wyświetlać w wynikach wyszukiwania.',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'description',
          type: 'text',
          rows: 3,
          title: 'Opis',
          description: 'Krótki opis Twojej organizacji, który będzie wyświetlany w wynikach wyszukiwania.',
          validation: Rule => Rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Ustawienia globalne',
    }),
  },
});
