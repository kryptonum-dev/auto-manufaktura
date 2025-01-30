import { defineField, defineType } from 'sanity';
import { defineSlugForDocument } from '../../utils/define-slug-for-document';

const name = 'Contact_Page';
const title = 'Kontakt';
const slug = '/kontakt';
const icon = () => '✉️';

export default defineType({
  name,
  type: 'document',
  title,
  icon,
  options: { documentPreview: true },
  fields: [
    ...defineSlugForDocument({ slug }),
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
    prepare: () => ({
      title,
      subtitle: slug,
    }),
  },
});
