import { defineField, defineType } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';

const name = 'Faq_Collection';
const title = 'Zbiór elementów FAQ';
const icon = () => '❓';

export default defineType({
  name,
  type: 'document',
  title,
  icon,
  fields: [
    defineField({
      name: 'question',
      type: 'Heading',
      title: 'Pytanie',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'answer',
      type: 'PortableText',
      title: 'Odpowiedź',
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      question: 'question',
      answer: 'answer',
    },
    prepare: ({ question, answer }) => ({
      title: toPlainText(question),
      subtitle: toPlainText(answer),
      icon,
    }),
  },
});
