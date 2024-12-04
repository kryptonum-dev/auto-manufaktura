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
    defineField({
      name: 'highlightedService',
      type: 'reference',
      title: 'Wyróżniona usługa (opcjonalnie)',
      description: 'Wybierz jedną z wybranych wcześniej usług, która ma być wyróżniona.',
      to: [{ type: 'Service_Collection' }],
      hidden: ({ parent }) => {
        if (!parent.services) return true;
        return (parent.services as { _ref?: string }[]).filter(item => item._ref).length === 0;
      },
      options: {
        disableNew: true,
        filter: ({ parentPath, document }) => {
          const componentKey = (parentPath as { _key: string }[])?.[1]?._key;
          const component = (document.components as { _key: string; services?: { _ref?: string }[] }[]).find(
            item => item._key === componentKey
          );
          const selectedIds = component?.services?.filter(item => item._ref).map(item => item._ref) || [];
          if (selectedIds?.length > 0) {
            return {
              filter: '(_id in $selectedIds) && !(_id in path("drafts.**")) && isSubPage',
              params: { selectedIds },
            };
          }
          return {};
        },
      },
    }),
    defineField({
      name: 'highlightedLabel',
      type: 'string',
      title: 'Etykieta dla wyróżnionej usługi',
      hidden: ({ parent }) => !parent.highlightedService,
      validation: Rule =>
        Rule.custom((value, context) => {
          const highlightedService = (context.parent as { highlightedService: { _ref: string } })?.highlightedService;
          if (highlightedService && !value) {
            return 'Etykieta dla wyróżnionej usługi jest wymagana.';
          }
          return true;
        }),
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
