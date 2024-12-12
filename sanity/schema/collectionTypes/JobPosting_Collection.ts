import { defineField, defineType } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';
import { filterUniqueReferences } from '../../utils/filter-unique-references';

const name = 'JobPosting_Collection';
const title = 'Zbiór ofert pracy';
const icon = () => '🚀';

export default defineType({
  name,
  type: 'document',
  title,
  icon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Nazwa stanowiska',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'workshops',
      type: 'array',
      title: 'Przypisane lokalizacje',
      description: 'Wybierz lokalizacje, w których ta oferta pracy jest dostępna.',
      of: [
        defineField({
          name: 'workshop',
          type: 'reference',
          title: 'Lokalizacja',
          to: [{ type: 'Workshop_Collection' }],
          options: {
            disableNew: true,
            filter: filterUniqueReferences(),
          },
          validation: Rule => Rule.required(),
        }),
      ],
      validation: Rule => Rule.required().error('Musisz przypisać przynajmniej jedną lokalizację do oferty pracy.'),
    }),
    defineField({
      name: 'intro',
      type: 'PortableText',
      title: 'Wstęp (opcjonalny)',
      description: 'Krótki wstęp opisujący ofertę pracy.',
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tagi dla stanowiska (opcjonalne)',
      description: 'Dodaj wyróżniki oferty pracy, np. "Praca od zaraz", "Pełny etat".',
      of: [
        defineField({
          name: 'tag',
          type: 'object',
          title: 'Tag',
          fields: [
            defineField({
              name: 'icon',
              type: 'image',
              title: 'Ikonka tagu',
              description: 'Obsługiwane są tylko pliki SVG.',
              options: {
                accept: '.svg',
              },
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'label',
              type: 'string',
              title: 'Treść tagu',
              validation: Rule => Rule.required(),
            }),
          ],
          validation: Rule => Rule.required(),
          preview: {
            select: {
              media: 'icon',
              title: 'label',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Szczegółowy opis stanowiska (opcjonalny)',
      description: 'Dodaj szczegółowe sekcje z listą punktów, np. "Zakres obowiązków" lub "Wymagania".',
      of: [
        defineField({
          name: 'section',
          type: 'object',
          title: 'Sekcja szczegółowa',
          fields: [
            defineField({
              name: 'heading',
              type: 'Heading',
              title: 'Nagłówek sekcji',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'list',
              type: 'array',
              title: 'Lista elementów',
              of: [
                defineField({
                  name: 'item',
                  type: 'object',
                  title: 'Element listy',
                  fields: [
                    defineField({
                      name: 'text',
                      type: 'Heading',
                      title: 'Treść',
                      validation: Rule => Rule.required(),
                    }),
                  ],
                  validation: Rule => Rule.required(),
                  preview: {
                    select: {
                      text: 'text',
                    },
                    prepare: ({ text }) => ({
                      title: toPlainText(text),
                      icon: () => '✔️',
                    }),
                  },
                }),
              ],
              validation: Rule => Rule.min(1).required(),
            }),
          ],
          preview: {
            select: {
              heading: 'heading',
            },
            prepare: ({ heading }) => ({
              title: toPlainText(heading),
              icon: () => '➡️',
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      name: 'name',
    },
    prepare: ({ name }) => ({
      title: name,
      icon: () => '👨‍💻',
    }),
  },
});
