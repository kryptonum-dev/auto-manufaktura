import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';
import { sectionPreview } from '../../utils/section-preview';

const name = 'PhotosAndVideosSection';
const title = 'Sekcja z zdjęciami i wideo';
const icon = () => '🎞️';

export default defineField({
  name,
  type: 'object',
  title,
  icon,
  fields: [
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Sekcje',
      of: [
        defineField({
          name: 'section',
          type: 'object',
          title: 'Sekcja',
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
              title: 'Paragraf (opcjonalne)',
            }),
            defineField({
              name: 'media',
              type: 'array',
              title: 'Media',
              of: [
                defineField({
                  name: 'item',
                  type: 'object',
                  title: 'Media',
                  fields: [
                    defineField({
                      name: 'image',
                      type: 'image',
                      title: 'Zdjęcie',
                      validation: Rule => Rule.required(),
                    }),
                    defineField({
                      name: 'video',
                      type: 'mux.video',
                      title: 'Wideo (opcjonalne)',
                      description: 'Jeśli dodasz wideo, po kliknięciu w zdjęcie, wideo otworzy się w oknie modalnym.',
                    }),
                    defineField({
                      name: 'title',
                      type: 'string',
                      title: 'Tytuł (podpis pod zdjęciem)',
                      validation: Rule => Rule.required(),
                    }),
                    defineField({
                      name: 'subtitle',
                      type: 'string',
                      title: 'Podtytuł (opcjonalny)',
                      description: 'Dodatkowy tekst, który będzie wyświetlany poniżej tytułu.',
                    }),
                  ],
                  validation: Rule => Rule.required(),
                  preview: {
                    select: {
                      title: 'title',
                      image: 'image',
                    },
                    prepare: ({ image, title }) => ({
                      title,
                      media: image,
                    }),
                  },
                }),
              ],
              validation: Rule => Rule.min(3).required(),
            }),
            defineField({
              name: 'cta',
              type: 'cta',
              title: 'Wezwanie do działania (opcjonalne)',
            }),
          ],
          validation: Rule => Rule.required(),
          preview: {
            select: {
              heading: 'heading',
            },
            prepare: ({ heading }) => ({
              title: toPlainText(heading),
              icon,
            }),
          },
        }),
      ],
      validation: Rule => Rule.min(1).max(2).required(),
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
