import { defineField, defineType } from 'sanity';
import { defineSlugForDocument } from '../../utils/define-slug-for-document';

const name = 'Blog_Page';
const title = 'Blog';
const slug = '/blog';
const icon = () => '✍️';

export default defineType({
  name,
  type: 'document',
  title,
  icon,
  options: { documentPreview: false },
  fields: [
    ...defineSlugForDocument({ slug }),
    defineField({
      name: 'listing',
      type: 'object',
      title: 'Widok listy postów',
      fields: [
        defineField({
          name: 'heading',
          type: 'Heading',
          title: 'Nagłówek',
          description:
            'Nagłówek, który będzie widoczny, gdy wybrana kategoria to "Wszystkie". Dla innych kategorii nagłówek będzie pochodzić z danej kategorii.',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'paragraph',
          type: 'PortableText',
          title: 'Paragraf',
          description:
            'Treść paragrafu, która będzie widoczny, gdy wybrana kategoria to "Wszystkie". Dla innych kategorii treść paragrafu będzie pochodzić z danej kategorii.',
          validation: Rule => Rule.required(),
        }),
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'components',
      type: 'components',
      title: 'Komponenty podstrony (opcjonalne)',
      description: 'Dodatkowe komponenty, które zostaną wyświetlone pod widokiem listy postów na blogu.',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'seo',
    }),
  ],
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  preview: {
    prepare: () => ({
      title,
      subtitle: slug,
    }),
  },
});
