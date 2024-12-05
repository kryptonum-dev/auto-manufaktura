import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';
import { sectionPreview } from '../../utils/section-preview';
import { filterUniqueReferences } from '../../utils/filter-unique-references';

const name = 'Reviews';
const title = 'Opinie klientów';
const icon = () => '💬';

export default defineField({
  name,
  type: 'object',
  title,
  icon,
  fields: [
    defineField({
      name: 'heading',
      type: 'Heading',
      title: 'Nagłówek',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'reviews',
      type: 'array',
      title: 'Opinie klientów (opcjonalne)',
      description: (
        <>
          Jeśli nie dodasz żadnych recenzji w tej sekcji, automatycznie zostaną wyświetlone wszystkie opinie z kolekcji
          opinii klientów (
          <a
            href='/structure/Review_Collection'
            target='_blank'
            rel='noopener'
          >
            Review Collection
          </a>
          ). Zalecane jest dodanie co najmniej 3 opinii.
        </>
      ),
      of: [
        defineField({
          name: 'item',
          type: 'reference',
          to: [{ type: 'Review_Collection' }],
          options: {
            filter: filterUniqueReferences(),
          },
          validation: Rule => Rule.required(),
        }),
      ],
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
