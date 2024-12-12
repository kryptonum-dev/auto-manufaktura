import { defineField, defineType } from 'sanity';
import { defineSlugForDocument } from '../../utils/define-slug-for-document';
import { toPlainText } from '../../utils/to-plain-text';
import { filterUniqueReferences } from '../../utils/filter-unique-references';

const name = 'Career_Page';
const title = 'Rekrutacja';
const slug = '/rekrutacja';
const icon = () => '💼';

const JobOffer = defineField({
  name: 'jobOffer',
  type: 'object',
  title: 'Oferta pracy',
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
              of: [{ type: 'string' }],
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
      title: 'name',
    },
    prepare: ({ title }) => ({
      title,
      icon: () => '📂',
    }),
  },
});

export default defineType({
  name,
  type: 'document',
  title,
  icon,
  options: { documentPreview: false },
  fields: [
    ...defineSlugForDocument({ slug }),
    defineField({
      name: 'heading',
      type: 'Heading',
      title: 'Główny nagłówek na stronie',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'isHiring',
      type: 'boolean',
      title: 'Czy prowadzona jest rekrutacja?',
      description: 'Zaznacz, jeśli aktualnie prowadzona jest rekrutacja oraz dostępne są oferty pracy.',
      initialValue: false,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'emailForm',
      type: 'object',
      title: 'Formularz zapisu na powiadomienia o ofertach pracy',
      options: { collapsible: true },
      hidden: ({ parent }) => parent?.isHiring,
      fields: [
        defineField({
          name: 'heading',
          type: 'Heading',
          title: 'Nagłówek formularza',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'paragraph',
          type: 'PortableText',
          title: 'Treść paragrafu',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'formStates',
          type: 'formStates',
          title: 'Stany formularza',
          description: 'Treść wyświetlana użytkownikowi po wysłaniu formularza.',
          validation: Rule => Rule.required(),
        }),
      ],
      validation: Rule =>
        Rule.custom((value, context) => {
          const isHiring = (context?.parent as { isHiring: boolean })?.isHiring;
          if (!isHiring && !value)
            return 'Nagłówek, paragraf oraz stany formularza są wymagane, gdy rekrutacja nie jest prowadzona.';
          return true;
        }),
    }),
    defineField({
      name: 'jobOffers',
      type: 'array',
      title: 'Oferty pracy',
      description: 'Lista dostępnych ofert pracy.',
      hidden: ({ parent }) => !parent?.isHiring,
      of: [JobOffer],
      validation: Rule =>
        Rule.custom((value, context) => {
          const { isHiring, hasInternshipOffer } = context?.parent as {
            isHiring: boolean;
            hasInternshipOffer: boolean;
          };
          if (isHiring && !hasInternshipOffer && (!value || value.length === 0)) {
            return 'Jeśli prowadzona jest rekrutacja, musisz dodać przynajmniej jedną ofertę pracy lub zaznaczyć, że dostępna jest oferta praktyk.';
          }
          return true;
        }),
    }),
    defineField({
      name: 'hasInternshipOffer',
      type: 'boolean',
      title: 'Czy dostępne są praktyki?',
      description: 'Zaznacz, jeśli w ofercie dostępne są praktyki.',
      initialValue: false,
      hidden: ({ parent }) => !parent?.isHiring,
    }),
    defineField({
      name: 'internshipOffer',
      type: 'object',
      title: 'Oferta praktyk',
      description: 'Szczegóły dotyczące dostępnych praktyk.',
      options: { collapsible: true },
      hidden: ({ parent }) => !parent?.isHiring || !parent?.hasInternshipOffer,
      fields: [
        defineField({
          name: 'heading',
          type: 'Heading',
          title: 'Nagłówek oferty praktyk',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'paragraph',
          type: 'PortableText',
          title: 'Treść paragrafu (opcjonalna)',
        }),
        defineField({
          name: 'image',
          type: 'image',
          title: 'Zdjęcie',
          validation: Rule => Rule.required(),
        }),
      ],
      validation: Rule =>
        Rule.custom((value, context) => {
          const hasInternshipOffer = (context?.parent as { hasInternshipOffer?: boolean })?.hasInternshipOffer || false;
          if (hasInternshipOffer && !value) return 'Nagłówek oraz zdjęcie są wymagane, gdy dostępne są praktyki.';
          return true;
        }),
    }),
    defineField({
      name: 'applicationForm',
      type: 'object',
      title: 'Formularz aplikacji',
      description: 'Formularz do wysyłania aplikacji na wybrane stanowisko.',
      options: { collapsible: true },
      hidden: ({ parent }) => !parent?.isHiring,
      fields: [
        defineField({
          name: 'heading',
          type: 'Heading',
          title: 'Nagłówek formularza',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'subheading',
          type: 'Heading',
          title: 'Subnagłówek formularza (opcjonalny)',
        }),
        defineField({
          name: 'paragraph',
          type: 'PortableText',
          title: 'Treść paragrafu',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'images',
          type: 'array',
          title: 'Zdjęcia',
          description: 'Należy dodać 5 zdjęć.',
          of: [{ type: 'image' }],
          validation: Rule => Rule.length(5).error(),
        }),
        defineField({
          name: 'formStates',
          type: 'formStates',
          title: 'Stany formularza',
          description: 'Treść wyświetlana użytkownikowi po wysłaniu formularza.',
          validation: Rule => Rule.required(),
        }),
      ],
      validation: Rule =>
        Rule.custom((value, context) => {
          const isHiring = (context?.parent as { isHiring: boolean })?.isHiring;
          if (isHiring && !value)
            return 'Nagłówek, paragraf, zdjęcia oraz stany formularza są wymagane, gdy rekrutacja jest dostępna.';
          return true;
        }),
    }),
    defineField({
      name: 'components',
      type: 'components',
      title: 'Komponenty podstrony',
      hidden: ({ parent }) => !parent?.isHiring,
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'seo',
    }),
  ],
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  preview: {
    prepare: () => ({
      title,
      subtitle: slug,
    }),
  },
});
