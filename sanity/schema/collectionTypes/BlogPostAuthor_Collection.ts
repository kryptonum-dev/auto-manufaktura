import { defineField, defineType } from 'sanity';

const name = 'BlogPostAuthor_Collection';
const title = 'Blog - Autorzy';
const icon = () => '👨‍💻';

export default defineType({
  name,
  type: 'document',
  title,
  icon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Nazwa autora',
      description: 'Wprowadź nazwę autora artykułu. Może to być imię i nazwisko, pseudonim lub nazwa użytkownika.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Zdjęcie autora',
      description: 'Wprowadź zdjęcie (avatar) autora artykułu.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'text',
      type: 'string',
      title: 'Dodatkowa krótka informacja o autorze',
      description: 'Pole opcjonalne, max. 20 znaków.',
      validation: Rule => Rule.max(20).error('Zdanie może zawierać max. 20 znaków'),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
    prepare: ({ title, media }) => ({ title, media, icon }),
  },
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
});
