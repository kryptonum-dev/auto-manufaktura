import { defineField, defineType } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';

const name = 'fullCtaBox';
const title = 'Wezwanie do działania';
const icon = () => '📣';

export default defineType({
  name,
  type: 'object',
  title,
  icon,
  fields: [
    defineField({
      name: 'mainText',
      type: 'Heading',
      title: 'Główny komunikat',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'secondaryText',
      type: 'Heading',
      title: 'Dodatkowy komunikat (opcjonalny)',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'cta',
      type: 'cta',
      title: 'Przycisk',
      validation: Rule => Rule.required(),
    }),
  ],
  validation: Rule => Rule.required(),
  preview: {
    select: {
      mainText: 'mainText',
    },
    prepare: ({ mainText }) => ({
      title,
      subtitle: toPlainText(mainText),
      icon,
    }),
  },
});
