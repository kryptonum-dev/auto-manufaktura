import { defineField, defineType } from 'sanity';
import { defineSlugForDocument } from '../../utils/define-slug-for-document';

const name = 'Service_Collection';
const title = 'Usługi';
const icon = () => '🛠️';

export default defineType({
  name: name,
  type: 'document',
  title,
  icon,
  options: { documentPreview: false },
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Nazwa',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'isSubPage',
      type: 'boolean',
      title: 'Czy usługa jest częścią innej usługi?',
      description: 'Zaznacz, jeśli ta usługa jest częścią innej, głównej usługi.',
      validation: Rule => Rule.required(),
      initialValue: false,
    }),
    defineField({
      name: 'parentPage',
      type: 'reference',
      title: 'Strona nadrzędna (usługa główna)',
      description:
        'Wybierz stronę nadrzędną (usługa główna), z którą ta podstrona jest powiązana. Po jej wybraniu strona ta zostanie uznana za podstronę.',
      to: [{ type: 'Service_Collection' }],
      options: {
        disableNew: true,
        filter: ({ parent }) => {
          const drafts_id = (parent as { _id?: string })?._id || '';
          return {
            filter: 'defined(slug.current) && !isSubPage && !(_id in $selectedIds) && !(_id in path("drafts.**"))',
            params: { selectedIds: [drafts_id, drafts_id.replace(/^drafts\./, '')] },
          };
        },
      },
      hidden: ({ parent }) => !parent?.isSubPage,
      validation: Rule =>
        Rule.custom((value, context) => {
          const isSubPage = (context.parent as { isSubPage: boolean })?.isSubPage;
          if (isSubPage && !value) return 'Strona nadrzędna jest wymagana.';
          return true;
        }),
    }),
    ...defineSlugForDocument({
      source: 'name',
      prefix: '/usluga',
      hasPrefixSourceField: 'isSubPage',
      prefixSource: 'parentPage',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Zdjęcie główne',
      description: 'Zdjęcie reprezentujące usługę, widoczne w różnych miejscach (np. lista usług, nawigacja).',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tagi',
      description: 'Wprowadź tagi, które charakteryzują usługę (np. Naprawa, Serwis, Obsługa).',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      validation: Rule => Rule.unique().min(1).max(3).required().error('Musisz podać od 1 do 3 unikalnych tagów.'),
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
    select: {
      name: 'name',
      slug: 'slug.current',
      image: 'image',
    },
    prepare: ({ name, slug, image }) => ({
      title: name,
      subtitle: slug,
      media: image,
      icon,
    }),
  },
});
