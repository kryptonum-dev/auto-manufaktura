import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';
import { sectionPreview } from '../../utils/section-preview';
import { filterUniqueReferences } from '../../utils/filter-unique-references';

const name = 'FullServicesList';
const title = 'Pełna lista usług';
const icon = () => '📋';

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
      name: 'services',
      type: 'array',
      title: 'Główne usługi (opcjonalne)',
      description: (
        <>
          Jeśli nie dodasz dwóch głównych usług w tej sekcji, automatycznie zostaną wyświetlone dwie główne usługi z{' '}
          <a
            href='/structure/Service_Collection'
            target='_blank'
            rel='noopener'
          >
            kolekcji usług
          </a>
          . Główne usługi zostaną wyświetlone wraz z ich podusługami.
        </>
      ),
      of: [
        defineField({
          name: 'service',
          type: 'reference',
          title: 'Usługa',
          to: [{ type: 'Service_Collection' }],
          options: {
            disableNew: true,
            filter: filterUniqueReferences('defined(slug.current) && !isSubPage'),
          },
          validation: Rule => Rule.required(),
        }),
      ],
      validation: Rule => Rule.length(2).error('Musisz dodać dwie główne usługi'),
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
