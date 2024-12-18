import { defineField } from 'sanity';
import { sectionPreview } from '../../../utils/section-preview';
import { toPlainText } from '../../../utils/to-plain-text';

const name = 'Quote';
const title = 'Cytat';
const icon = () => '💬';

export default defineField({
  name,
  type: 'object',
  title,
  ...sectionPreview({ imgUrl: `/static/blogPost/${name}.webp`, icon: icon() }),
  fields: [
    defineField({
      name: 'text',
      type: 'PortableText',
      title: 'Tekst cytatu',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'author',
      type: 'string',
      title: 'Autor (opcjonalne)',
      description: 'Podaj imię i nazwisko autora cytatu lub jego pseudonim.',
    }),
  ],
  preview: {
    select: {
      text: 'text',
    },
    prepare: ({ text }) => ({
      title,
      subtitle: toPlainText(text),
      icon,
    }),
  },
});
