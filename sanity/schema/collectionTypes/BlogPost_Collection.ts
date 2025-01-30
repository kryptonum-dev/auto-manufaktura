import { defineField, defineType } from 'sanity';
import { defineSlugForDocument } from '../../utils/define-slug-for-document';
import BlogPostContent from '../components/blogPost';

const name = 'BlogPost_Collection';
const title = 'Blog - Artykuły';
const icon = () => '📰';

export default defineType({
  name,
  type: 'document',
  title,
  icon,
  options: { documentPreview: true },
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Nazwa artykułu',
      description:
        'Wprowadź nazwę artykułu. Będzie wyświetlana w okruszkach nawigacyjnych (breadcrumb) i w schematach Google.',
      validation: Rule => Rule.required(),
    }),
    ...defineSlugForDocument({ source: 'name', prefix: '/blog' }),
    defineField({
      name: 'heading',
      type: 'Heading',
      title: 'Nagłówek',
      description: 'Wprowadź główny tytuł artykułu, który będzie widoczny na stronie artykułu.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'paragraph',
      type: 'PortableText',
      title: 'Wstęp do artykułu (opcjonalny)',
      description:
        'Wprowadź wstęp do artykułu. Jest to opcjonalne pole, w którym możesz dodać krótki opis lub zapowiedź artykułu.',
    }),
    defineField({
      name: 'category',
      type: 'reference',
      title: 'Kategoria',
      options: {
        disableNew: true,
      },
      to: { type: 'BlogCategory_Collection' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Zdjęcie główne',
      description: 'Dodaj zdjęcie, które będzie reprezentować artykuł.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'date',
      title: 'Data publikacji (opcjonalnie)',
      description: 'Pozwala ustawić inną datę publikacji niż domyślna (data utworzenia).',
    }),
    defineField({
      name: 'author',
      type: 'reference',
      title: 'Autor (opcjonalne)',
      to: [{ type: 'BlogPostAuthor_Collection' }],
    }),
    BlogPostContent,
    defineField({
      name: 'components',
      type: 'components',
      title: 'Komponenty podstrony (opcjonalne)',
      description: 'Komponenty, które będą wyświetlane po treści artykułu.',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
      media: 'image',
    },
  },
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
});
