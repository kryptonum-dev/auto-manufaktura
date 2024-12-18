import { defineField } from 'sanity';
import { sectionPreview } from '../../../utils/section-preview';
import { toPlainText } from '../../../utils/to-plain-text';

const name = 'ListWithImages';
const title = 'Lista z obrazkami';
const icon = () => '📝';

export default defineField({
  name: name,
  type: 'object',
  title: title,
  ...sectionPreview({ imgUrl: `/static/blogPost/${name}.webp`, icon: icon() }),
  fields: [
    defineField({
      name: 'list',
      type: 'array',
      title: 'Lista',
      of: [
        defineField({
          name: 'item',
          type: 'object',
          title: 'Element listy',
          fields: [
            defineField({
              name: 'image',
              type: 'image',
              title: 'Obrazek',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'heading',
              type: 'Heading',
              title: 'Nagłówek',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'paragraph',
              type: 'PortableText',
              title: 'Paragraf (opcjonalny)',
            }),
          ],
          preview: {
            select: {
              heading: 'heading',
              paragraph: 'paragraph',
              image: 'image',
            },
            prepare({ heading, paragraph, image }) {
              return {
                title: toPlainText(heading),
                subtitle: toPlainText(paragraph),
                media: image,
              };
            },
          },
          validation: Rule => Rule.required(),
        }),
      ],
      validation: Rule => Rule.required().min(1),
    }),
  ],
  preview: {
    prepare: () => ({
      title,
      icon,
    }),
  },
});
