import { defineField } from 'sanity';
import { toPlainText } from '../../utils/to-plain-text';
import { sectionPreview } from '../../utils/section-preview';
import { filterUniqueReferences } from '../../utils/filter-unique-references';

const name = 'LatestBlogPosts';
const title = 'Najnowsze wpisy na blogu';
const icon = () => '📖';

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
      title: 'Paragraf (opcjonalne)',
    }),
    defineField({
      name: 'cta',
      type: 'cta',
      title: 'Wezwanie do działania (CTA)',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'posts',
      type: 'array',
      title: 'Artykuły na blogu (opcjonalne)',
      validation: Rule => Rule.length(3).error('Należy dodać trzy artykuły na blogu'),
      description: (
        <>
          Jeśli nie dodasz artykułów w tej sekcji, automatycznie zostaną wyświetlone trzy najnowsze wpisy z{' '}
          <a
            href='/structure/BlogPost_Collection'
            target='_blank'
            rel='noopener'
          >
            kolekcji artykułów na blogu
          </a>
          .
        </>
      ),
      of: [
        defineField({
          name: 'item',
          type: 'reference',
          title: 'Artykuł na blogu',
          to: [{ type: 'BlogPost_Collection' }],
          options: {
            disableNew: true,
            filter: filterUniqueReferences(),
          },
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
