import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';
import { sectionPreview } from '../../utils/section-preview';
import { filterUniqueReferences } from '../../utils/filter-unique-references';

const name = 'Faq';
const title = 'Najczęściej zadawane pytania FAQ';
const icon = () => '❓';

export default defineField({
  name,
  type: 'object',
  title,
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
      title: 'Paragraf (opcjonalny)',
    }),
    defineField({
      name: 'list',
      type: 'array',
      title: 'Lista pytań',
      of: [
        defineField({
          name: 'item',
          type: 'reference',
          title: 'FAQ',
          to: [{ type: 'Faq_Collection' }],
          options: {
            filter: filterUniqueReferences(),
          },
        }),
      ],
      validation: Rule => Rule.unique().required(),
    }),
    defineField({
      name: 'formStates',
      type: 'formStates',
      title: 'Stany formularza',
      description:
        'Zdefiniuj stany formularza, które pojawią się po wysłaniu pytania, takie jak potwierdzenie wysłania lub komunikat o błędzie.',
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
