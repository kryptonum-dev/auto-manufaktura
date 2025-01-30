import { defineField, defineType } from 'sanity';
import { PortableText } from '../ui/portable-text';
import { defineSlugForDocument } from '../../utils/define-slug-for-document';

const name = 'PrivacyPolicy_Page';
const title = 'Polityka prywatności';
const slug = '/polityka-prywatnosci';
const icon = () => '🔒';

export default defineType({
  name,
  type: 'document',
  title,
  icon,
  options: { documentPreview: true },
  fields: [
    ...defineSlugForDocument({ slug }),
    defineField({
      name: 'heading',
      type: 'Heading',
      title: 'Nagłówek',
      validation: Rule => Rule.required().error('Nagłówek strony jest wymagany.'),
    }),
    defineField({
      name: 'paragraph',
      type: 'PortableText',
      title: 'Paragraf wprowadzający (opcjonalny)',
      description: 'Opcjonalny tekst wprowadzający, który pojawi się pod nagłówkiem.',
    }),
    PortableText({
      name: 'content',
      title: 'Zawartość',
      allowHeadings: true,
      useCustomInput: false,
      components: [],
    }),
    defineField({
      name: 'components',
      type: 'components',
      title: 'Komponenty podstrony (opcjonalne)',
      description: 'Dodatkowe komponenty, które zostaną wyświetlone pod widokiem listy postów na blogu.',
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
