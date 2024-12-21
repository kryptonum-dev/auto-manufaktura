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
      name: 'additionalInfo',
      type: 'PortableText',
      title: 'Dodatkowe informacje kontaktowe (opcjonalne)',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Zdjęcie',
      validation: Rule => Rule.required(),
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
      content: 'content',
    },
    prepare: ({ heading, content }) => ({
      title: title,
      subtitle: heading ? toPlainText(heading) : toPlainText(content),
      ...sectionPreview({ imgUrl: `/static/components/${name}.webp`, icon: icon() }),
    }),
  },
});
