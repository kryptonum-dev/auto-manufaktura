import { defineType } from 'sanity';

export default defineType({
  name: 'components',
  type: 'array',
  title: 'Komponenty',
  of: [],
  options: {
    insertMenu: {
      filter: true,
      showIcons: true,
      views: [
        {
          name: 'grid',
          previewImageUrl: schemaTypeName => `/static/components/${schemaTypeName}.webp`,
        },
        { name: 'list' },
      ],
    },
  },
});
