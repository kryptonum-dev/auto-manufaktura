import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';
import { sectionPreview } from '../../utils/section-preview';

const name = 'SimplePhotoAndText';
const title = 'Prosty komponent z tekstem i zdjęciem';
const icon = () => '🖼️';

export default defineField({
  name,
  type: 'object',
  title,
  icon,
  fields: [
    defineField({
      name: 'heading',
      type: 'Heading',
      title: 'Nagłówek (opcjonalny)',
    }),
    defineField({
      name: 'content',
      type: 'PortableText',
      title: 'Treść',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Zdjęcie',
    }),
    defineField({
      name: 'imagePosition',
      type: 'string',
      title: 'Pozycja zdjęcia',
      description: 'Wybierz, po której stronie ma być obraz: po lewej czy po prawej stronie.',
      options: {
        list: [
          { title: 'Lewo', value: 'left' },
          { title: 'Prawo', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
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
