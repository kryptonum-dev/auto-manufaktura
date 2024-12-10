import { defineField, defineType } from 'sanity';

const name = 'formStates';
const title = 'Stany formularza';
const icon = () => '✅';

export default defineType({
  name,
  type: 'object',
  title,
  icon,
  fields: [
    defineField({
      name: 'success',
      type: 'object',
      title: 'Stan sukcesu',
      description: 'Nagłówek, treść komunikatu i CTA wyświetlane, gdy formularz zostanie pomyślnie wysłany.',
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
        defineField({
          name: 'ctaText',
          type: 'string',
          title: 'Tekst CTA',
          description: 'Tekst przycisku CTA, np. "Prześlij kolejne".',
          validation: Rule => Rule.required(),
        }),
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'error',
      type: 'object',
      title: 'Stan błędu',
      description: 'Nagłówek, treść komunikatu i CTA wyświetlane, gdy wystąpi błąd podczas wysyłania formularza.',
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
        defineField({
          name: 'ctaText',
          type: 'string',
          title: 'Tekst CTA',
          description: 'Tekst przycisku CTA, np. "Spróbuj ponownie".',
          validation: Rule => Rule.required(),
        }),
      ],
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({
      title,
      icon,
    }),
  },
});
