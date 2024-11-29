import { defineField } from 'sanity';

export default defineField({
  name: 'Image',
  type: 'image',
  title: 'Zdjęcie',
  icon: () => '🖼️',
  validation: Rule => Rule.required(),
});
