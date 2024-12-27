import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';
import { sectionPreview } from '../../utils/section-preview';

const name = 'MediaWithCenteredContentSection';
const title = 'Sekcja z mediami i wyśrodkowaną treścią';
const icon = () => '🎨';

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
      name: 'text',
      type: 'Heading',
      title: 'Tekst',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'media',
      type: 'object',
      title: 'Media',
      fields: [
        defineField({
          name: 'type',
          type: 'string',
          title: 'Typ',
          options: {
            layout: 'radio',
            list: [
              { value: 'image', title: 'Zdjęcie' },
              { value: 'video', title: 'Wideo' },
            ],
            direction: 'horizontal',
          },
          initialValue: 'video',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'image',
          type: 'image',
          title: 'Zdjęcie',
          hidden: ({ parent }) => parent?.type === 'video',
          validation: Rule =>
            Rule.custom((value, context) => {
              const type = (context.parent as { type: 'image' | 'video' })?.type;
              if (type === 'image' && !value) return 'Pole jest wymagane';
              return true;
            }),
        }),
        defineField({
          name: 'video',
          type: 'mux.video',
          title: 'Wideo',
          options: {
            collapsible: false,
          },
          hidden: ({ parent }) => parent?.type === 'image',
          validation: Rule =>
            Rule.custom((value, context) => {
              const type = (context.parent as { type: 'image' | 'video' })?.type;
              if (type === 'video' && !value) return 'Pole jest wymagane';
              return true;
            }),
        }),
      ],
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
