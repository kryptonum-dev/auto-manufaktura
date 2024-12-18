import { defineField } from 'sanity';

export default defineField({
  name: 'Image',
  type: 'object',
  title: 'Zdjęcie',
  icon: () => '🖼️',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Zdjęcie',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'text',
      type: 'string',
      title: 'Podpis pod zdjęciem / źródło (opcjonalne)',
    }),
  ],
  preview: {
    select: {
      media: 'image',
    },
    prepare: ({ media }) => ({
      title: 'Zdjęcie',
      media,
    }),
  },
});
