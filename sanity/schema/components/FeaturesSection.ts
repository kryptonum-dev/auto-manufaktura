import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';
import { sectionPreview } from '../../utils/section-preview';

const name = 'FeaturesSection';
const title = 'Sekcja kluczowych cech';
const icon = () => '✅';

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
      name: 'features',
      type: 'array',
      title: 'Lista cech',
      of: [
        defineField({
          name: 'item',
          type: 'object',
          title: 'Cecha',
          fields: [
            defineField({
              name: 'text',
              type: 'Heading',
              title: 'Treść',
              validation: Rule => Rule.required(),
            }),
          ],
          preview: {
            select: {
              text: 'text',
            },
            prepare: ({ text }) => ({
              title: toPlainText(text),
              icon: () => '✅',
            }),
          },
          validation: Rule => Rule.required(),
        }),
      ],
      validation: Rule => Rule.min(3).max(6).required(),
    }),
    defineField({
      name: 'ctaBox',
      type: 'object',
      title: 'Wezwanie do działania',
      fields: [
        defineField({
          name: 'text',
          type: 'Heading',
          title: 'Komunikat',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'cta',
          type: 'cta',
          title: 'Przycisk CTA',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'image',
          type: 'image',
          title: 'Zdjęcie',
          validation: Rule => Rule.required(),
        }),
      ],
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
