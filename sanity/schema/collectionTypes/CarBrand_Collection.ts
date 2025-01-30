import { defineField, defineType } from 'sanity';
import { defineSlugForDocument } from '../../utils/define-slug-for-document';

const name = 'CarBrand_Collection';
const title = 'Marki samochodów';
const icon = () => '🚘';

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
      title: 'Nazwa',
      validation: Rule => Rule.required(),
    }),
    ...defineSlugForDocument({ source: 'name', prefix: '/marka' }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Zdjęcie główne',
      description:
        'To zdjęcie będzie widoczne w wielu miejscach, takich jak nawigacja czy lista obsługiwanych marek samochodów.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Logo marki',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'components',
      type: 'components',
      title: 'Komponenty podstrony',
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
