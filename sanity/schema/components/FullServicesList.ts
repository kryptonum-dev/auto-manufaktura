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
      title: 'Główne usługi',
      description: 'Dodaj dwie główne usługi, które będą wyświetlane wraz z ich podusługami.',
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
      validation: Rule => Rule.length(2).required().error('Musisz dodać dwie główne usługi'),
    }),
    defineField({
      name: 'highlightedService',
      type: 'object',
      title: 'Wyróżniona usługa',
      description: 'Wybierz usługę, którą chcesz wyróżnić na liście.',
      fields: [
        defineField({
          name: 'service',
          type: 'reference',
          title: 'Usługa',
          to: [{ type: 'Service_Collection' }],
          options: {
            filter: 'defined(slug.current) && isSubPage',
            disableNew: true,
          },
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'heading',
          type: 'Heading',
          title: 'Nagłówek',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'label',
          type: 'string',
          title: 'Etykieta dla wyróżnionej usługi',
          validation: Rule => Rule.required(),
        }),
      ],
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
