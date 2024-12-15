import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';
import { sectionPreview } from '../../utils/section-preview';
import { filterUniqueReferences } from '../../utils/filter-unique-references';

const name = 'SelectedServicesList';
const title = 'Lista z wybranymi usługami';
const icon = () => '🛠️';

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
      name: 'paragraph',
      type: 'PortableText',
      title: 'Paragraf',
      description: 'Krótki opis, który zostanie wyświetlony pod nagłówkiem (opcjonalnie).',
    }),
    defineField({
      name: 'services',
      type: 'array',
      title: 'Wybrane usługi',
      description: 'Wybierz usługi, które mają być widoczne w tej sekcji.',
      of: [
        defineField({
          name: 'service',
          type: 'reference',
          title: 'Usługa',
          to: [{ type: 'Service_Collection' }],
          options: {
            disableNew: true,
            filter: filterUniqueReferences('defined(slug.current)'),
          },
          validation: Rule => Rule.required(),
        }),
      ],
      validation: Rule => Rule.required().min(4).max(6).error('Musisz wybrać od 4 do 6 usług.'),
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
