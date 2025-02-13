import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';
import { sectionPreview } from '../../utils/section-preview';
import { filterUniqueReferences } from '../../utils/filter-unique-references';

const name = 'InfoHeroSection';
const title = 'Sekcja informacyjna Hero';
const icon = () => '✨';

export default defineField({
  name,
  type: 'object',
  title,
  icon,
  fields: [
    defineField({
      name: 'heading',
      type: 'Heading',
      title: 'Nagłówek',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'PortableText',
      title: 'Treść',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'contact',
      type: 'array',
      title: 'Dodatkowe informacje kontaktowe (opcjonalne)',
      description:
        'Jeśli wybierzesz warsztat/y, poniżej treści pojawią się dodatkowe dane kontaktowe, takie jak adres, telefon oraz adres e-mail.',
      of: [
        defineField({
          name: 'workshop',
          type: 'reference',
          title: 'Oddział',
          to: [{ type: 'Workshop_Collection' }],
          options: {
            disableNew: true,
            filter: filterUniqueReferences('type == "workshop"'),
          },
          validation: Rule => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Logo',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Zdjęcie',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'cta',
      type: 'cta',
      title: 'Wezwanie do działania',
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare: ({ heading }) => ({
      title: title,
      subtitle: toPlainText(heading),
      ...sectionPreview({ imgUrl: `/static/components/${name}.webp`, icon: icon() }),
    }),
  },
});
