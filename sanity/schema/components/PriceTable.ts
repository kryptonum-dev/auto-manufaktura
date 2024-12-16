import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';
import { sectionPreview } from '../../utils/section-preview';

const name = 'PriceTable';
const title = 'Tabela cen';
const icon = () => '🧾';

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
      name: 'priceDetails',
      type: 'object',
      title: 'Koszty',
      fields: [
        defineField({
          name: 'work',
          type: 'number',
          title: 'Koszt pracy',
          validation: Rule => Rule.min(0).required(),
          fieldset: 'prices',
        }),
        defineField({
          name: 'parts',
          type: 'number',
          title: 'Koszty części (opcjonalne)',
          validation: Rule => Rule.min(0),
          fieldset: 'prices',
        }),
        defineField({
          name: 'vat',
          type: 'number',
          title: 'VAT',
          validation: Rule => Rule.min(0).required(),
          fieldset: 'prices',
        }),
      ],
      fieldsets: [
        {
          name: 'prices',
          title: 'Szczegóły cen',
          options: {
            columns: 3,
          },
        },
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'note',
      type: 'PortableText',
      title: 'Dodatkowe informacje (opcjonalne)',
      description: 'Treść pojawi się poniżej tabeli z kosztami.',
    }),
    defineField({
      name: 'ctaBox',
      type: 'object',
      title: 'Wezwanie do działania',
      fields: [
        defineField({
          name: 'text',
          type: 'Heading',
          title: 'Komunikat',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'cta',
          type: 'cta',
          title: 'Przycisk CTA',
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
