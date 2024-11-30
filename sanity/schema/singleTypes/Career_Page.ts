import { defineField, defineType } from 'sanity';
import { defineSlugForDocument } from '../../utils/define-slug-for-document';

const name = 'Career_Page';
const title = 'Rekrutacja';
const slug = '/rekrutacja';
const icon = () => '💼';

export default defineType({
  name,
  type: 'document',
  title,
  icon,
  options: { documentPreview: false },
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
