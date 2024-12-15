import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';
import { sectionPreview } from '../../utils/section-preview';

const name = 'Prices';
const title = 'Cennik';
const icon = () => '💲';

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
      title: 'Opis (opcjonalny)',
    }),
    defineField({
      name: 'additionalInfo',
      type: 'Heading',
      title: 'Wyróżniona informacja (opcjonalne)',
    }),
    defineField({
      name: 'section',
      type: 'array',
      title: 'Sekcje cennika',
      of: [
        defineField({
          name: 'item',
          type: 'object',
          title: 'Szczegóły sekcji',
          fields: [
            defineField({
              name: 'heading',
              type: 'Heading',
              title: 'Tytuł sekcji',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'list',
              type: 'array',
              title: 'Lista usług w sekcji',
              of: [
                defineField({
                  name: 'item',
                  type: 'object',
                  title: 'Szczegóły usługi',
                  fields: [
                    defineField({
                      name: 'heading',
                      type: 'Heading',
                      title: 'Nazwa usługi',
                      validation: Rule => Rule.required(),
                    }),
                    defineField({
                      name: 'prices',
                      type: 'array',
                      title: 'Ceny usług',
                      of: [
                        defineField({
                          name: 'price',
                          type: 'object',
                          title: 'Cena usługi',
                          fields: [
                            defineField({
                              name: 'name',
                              type: 'Heading',
                              title: 'Nazwa usługi',
                              validation: Rule => Rule.required(),
                            }),
                            defineField({
                              name: 'price',
                              type: 'Heading',
                              title: 'Cena usługi',
                              validation: Rule => Rule.required(),
                            }),
                          ],
                          validation: Rule => Rule.required(),
                          preview: {
                            select: {
                              name: 'name',
                              price: 'price',
                            },
                            prepare: ({ name, price }) => ({
                              title: toPlainText(name),
                              subtitle: toPlainText(price),
                              icon: () => '▶️',
                            }),
                          },
                        }),
                      ],
                      validation: Rule => Rule.required(),
                    }),
                    defineField({
                      name: 'isHighlighted',
                      type: 'boolean',
                      title: 'Czy usługa ma być wyróżniona?',
                      initialValue: false,
                    }),
                    defineField({
                      name: 'highlightedLabel',
                      type: 'string',
                      title: 'Etykieta wyróżnionej usługi',
                      hidden: ({ parent }) => !parent.isHighlighted,
                      validation: Rule =>
                        Rule.custom((value, context) => {
                          const isHighlighted = (context.parent as { isHighlighted: boolean })?.isHighlighted;
                          if (isHighlighted && !value) return 'Etykieta dla wyróżnionej usługi jest wymagana.';
                          return true;
                        }),
                    }),
                  ],
                  validation: Rule => Rule.required(),
                  preview: {
                    select: {
                      heading: 'heading',
                      isHighlighted: 'isHighlighted',
                    },
                    prepare: ({ heading, isHighlighted }) => ({
                      title: toPlainText(heading),
                      subtitle: isHighlighted ? 'Wyróżniona usługa' : '',
                      icon: () => '💰',
                    }),
                  },
                }),
              ],
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
              icon: () => '🏷️',
            }),
          },
        }),
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'fullCtaBox',
      type: 'fullCtaBox',
      title: 'Wezwanie do działania (CTA)',
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
