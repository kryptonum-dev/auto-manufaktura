import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';
import { sectionPreview } from '../../utils/section-preview';
import { filterUniqueReferences } from '../../utils/filter-unique-references';

const name = 'ContactForm';
const title = 'Formularz kontaktowy';
const icon = () => '📩';

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
      name: 'text',
      type: 'Heading',
      title: 'Tekst dodatkowy (opcjonalny)',
      description: 'Krótki tekst, który będzie wyświetlany pod nagłówkiem.',
    }),
    defineField({
      name: 'workshops',
      type: 'array',
      title: 'Warsztaty (opcjonalne)',
      description: (
        <>
          Jeśli nie dodasz żadnych warsztatów do tej sekcji, automatycznie wyświetlą się wszystkie warsztaty z (
          <a
            href='/structure/Workshop_Collection'
            target='_blank'
            rel='noopener'
          >
            Kolekcji Warsztatów
          </a>
          ).
        </>
      ),
      of: [
        defineField({
          name: 'item',
          type: 'reference',
          title: 'Warsztat',
          to: [{ type: 'Workshop_Collection' }],
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
