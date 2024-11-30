import { defineField, defineType } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';
import { defineSlugForDocument } from '../../utils/define-slug-for-document';

const name = 'PrivacyPolicy_Page';
const title = 'Polityka prywatności';
const slug = '/polityka-prywatnosci';
const icon = () => '🔒';

export default defineType({
  name,
  type: 'document',
  title,
  icon,
  fields: [
    ...defineSlugForDocument({ slug }),
    defineField({
      name: 'heading',
      type: 'Heading',
      title: 'Nagłówek',
      validation: Rule => Rule.required().error('Nagłówek strony jest wymagany.'),
    }),
    defineField({
      name: 'paragraph',
      type: 'PortableText',
      title: 'Paragraf wprowadzający (opcjonalny)',
      description: 'Opcjonalny tekst wprowadzający, który pojawi się pod nagłówkiem.',
    }),
    defineField({
      name: 'list',
      type: 'array',
      title: 'Zawartość polityki prywatności',
      description: 'Lista sekcji polityki prywatności (każda sekcja musi zawierać nagłówek i treść).',
      of: [
        defineField({
          name: 'content',
          type: 'object',
          title: 'Sekcja',
          fields: [
            defineField({
              name: 'heading',
              type: 'Heading',
              title: 'Nagłówek sekcji',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'text',
              type: 'PortableText',
              title: 'Treść sekcji',
              validation: Rule => Rule.required(),
            }),
          ],
          validation: Rule => Rule.required(),
          preview: {
            select: {
              heading: 'heading',
            },
            prepare: ({ heading }) => ({
              title: toPlainText(heading),
              icon: () => '➡️',
            }),
          },
        }),
      ],
      validation: Rule => Rule.required().min(1).error('Musisz dodać przynajmniej jedną sekcję polityki prywatności.'),
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'seo',
    }),
  ],
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  preview: {
    prepare: () => ({
      title,
      subtitle: slug,
    }),
  },
});
