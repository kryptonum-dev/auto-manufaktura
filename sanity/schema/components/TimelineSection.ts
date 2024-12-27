import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';
import { sectionPreview } from '../../utils/section-preview';

const name = 'TimelineSection';
const title = 'Sekcja z osią czasu';
const icon = () => '⏳';

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
      title: 'Paragraf (opcjonalny)',
    }),
    defineField({
      name: 'headerImage',
      type: 'image',
      title: 'Zdjęcie',
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
          title: 'Obrazek w tle',
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
          title: 'Wideo w tle',
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
      name: 'timeline',
      type: 'array',
      title: 'Oś czasu',
      of: [
        defineField({
          name: 'item',
          type: 'object',
          title: 'Element osi czasu',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              title: 'Etykieta (np. rok)',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'text',
              type: 'Heading',
              title: 'Treść',
              validation: Rule => Rule.required(),
            }),
          ],
          validation: Rule => Rule.required(),
          preview: {
            select: {
              label: 'label',
              text: 'text',
            },
            prepare: ({ label, text }) => ({
              title: label,
              subtitle: toPlainText(text),
              icon: () => '🕒',
            }),
          },
        }),
      ],
      validation: Rule => Rule.min(2).required(),
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
