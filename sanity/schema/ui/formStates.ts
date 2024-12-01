import { defineField } from 'sanity';

export default defineField({
  name: 'formState',
  type: 'object',
  title: 'Stany formularza',
  description: 'Treść wyświetlana użytkownikowi po wysłaniu formularza.',
  fields: [
    defineField({
      name: 'success',
      type: 'object',
      title: 'Stan sukcesu',
      description: 'Nagłówek i treść komunikatu, który będzie wyświetlany, gdy formularz zostanie pomyślnie wysłany.',
      fields: [
        defineField({
          name: 'heading',
          type: 'Heading',
          title: 'Nagłówek',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'paragraph',
          type: 'PortableText',
          title: 'Treść komunikatu',
          validation: Rule => Rule.required(),
        }),
      ],
      validation: Rule => Rule.required().error('Nagłówek i treść komunikatu są wymagane'),
    }),
    defineField({
      name: 'error',
      type: 'object',
      title: 'Stan błędu',
      description:
        'Nagłówek i treść komunikatu, który będzie wyświetlany, gdy wystąpi błąd podczas wysyłania formularza.',
      fields: [
        defineField({
          name: 'heading',
          type: 'Heading',
          title: 'Nagłówek',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'paragraph',
          type: 'PortableText',
          title: 'Treść komunikatu',
          validation: Rule => Rule.required(),
        }),
      ],
      validation: Rule => Rule.required().error('Nagłówek i treść komunikatu są wymagane'),
    }),
  ],
  validation: Rule => Rule.required().error('Stany formularza są wymagane'),
});
