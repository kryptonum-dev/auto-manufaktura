import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';
import { sectionPreview } from '../../utils/section-preview';
import { filterUniqueReferences } from '../../utils/filter-unique-references';

const name = 'LocationsSection';
const title = 'Sekcja z lokalizacjami';
const icon = () => '🔗';

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
      title: 'Paragraf (opcjonalny)',
    }),
    defineField({
      name: 'media',
      type: 'object',
      title: 'Media',
      fields: [
        defineField({
          name: 'type',
          type: 'string',
          title: 'Typ',
          options: {
            layout: 'radio',
            list: [
              { value: 'image', title: 'Zdjęcie' },
              { value: 'video', title: 'Wideo' },
            ],
            direction: 'horizontal',
          },
          initialValue: 'video',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'image',
          type: 'image',
          title: 'Zdjęcie',
          hidden: ({ parent }) => parent?.type === 'video',
          validation: Rule =>
            Rule.custom((value, context) => {
              const type = (context.parent as { type: 'image' | 'video' })?.type;
              if (type === 'image' && !value) return 'Pole jest wymagane';
              return true;
            }),
        }),
        defineField({
          name: 'video',
          type: 'mux.video',
          title: 'Wideo',
          options: {
            collapsible: false,
          },
          hidden: ({ parent }) => parent?.type === 'image',
          validation: Rule =>
            Rule.custom((value, context) => {
              const type = (context.parent as { type: 'image' | 'video' })?.type;
              if (type === 'video' && !value) return 'Pole jest wymagane';
              return true;
            }),
        }),
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'locations',
      type: 'array',
      title: 'Lokalizacje (opcjonalne)',
      validation: Rule => Rule.min(3).error('Należy dodać minimum trzy lokalizacje'),
      description: (
        <>
          Jeśli nie dodasz żadnych lokalizacji w tej sekcji, automatycznie zostaną wyświetlone wszystkie lokalizacje z (
          <a
            href='/structure/Location_Collection'
            target='_blank'
            rel='noopener'
          >
            kolekcji lokalizacji
          </a>
          ).
        </>
      ),
      of: [
        defineField({
          name: 'item',
          type: 'reference',
          title: 'Lokalizacja',
          to: [{ type: 'Location_Collection' }],
          options: {
            disableNew: true,
            filter: filterUniqueReferences('defined(slug.current)'),
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
