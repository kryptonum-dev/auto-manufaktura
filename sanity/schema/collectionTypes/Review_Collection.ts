import { defineField, defineType } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';

const name = 'Review_Collection';
const title = 'Zbiór opinii klientów';
const icon = () => '💬';

export default defineType({
  name,
  type: 'document',
  title,
  icon,
  fields: [
    defineField({
      name: 'username',
      type: 'string',
      title: 'Nazwa użytkownika',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'rating',
      type: 'number',
      title: 'Ocena',
      description: 'Ocena (1.0 - 5.0)',
      validation: Rule =>
        Rule.required().min(1).max(5).error('Ocena jest wymagana i musi mieścić się w przedziale od 1.0 do 5.0'),
    }),
    defineField({
      name: 'date',
      type: 'date',
      title: 'Data wystawienia opinii',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'review',
      type: 'PortableText',
      title: 'Treść opinii',
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      username: 'username',
      review: 'review',
    },
    prepare: ({ username, review }) => ({
      title: username,
      subtitle: toPlainText(review),
      icon,
    }),
  },
});
