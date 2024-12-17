import { defineField, defineType } from 'sanity';
import { defineSlugForDocument } from '../../utils/define-slug-for-document';

const name = 'BlogCategory_Collection';
const title = 'Blog - Kategorie';
const icon = () => '🏷️';

export default defineType({
  name,
  type: 'document',
  title,
  icon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Nazwa kategorii',
      description: 'Wprowadź nazwę kategorii, która będzie reprezentować grupę powiązanych artykułów na blogu.',
      validation: Rule => Rule.required(),
    }),
    ...defineSlugForDocument({ source: 'name', prefix: '/blog/kategoria' }),
    defineField({
      name: 'listing',
      type: 'object',
      title: 'Widok listy postów',
      fields: [
        defineField({
          name: 'heading',
          type: 'Heading',
          title: 'Nagłówek',
          description: 'Wprowadź główny nagłówek, który będzie widoczny na stronie z artykułami danej kategorii.',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'paragraph',
          type: 'PortableText',
          title: 'Paragraf',
          description: 'Wprowadź tekst, który będzie krótkim wstępem dla tej kategorii.',
          validation: Rule => Rule.required(),
        }),
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
      icon: 'icon',
    },
  },
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
});
