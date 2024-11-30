import { defineField } from 'sanity';
import { InternalLinkableTypes } from '../../../structure/internal-linkable-types';
import { filterUniqueReferences } from '../../../utils/filter-unique-references';

export default defineField({
  name: 'internal',
  type: 'object',
  title: 'Wewnętrzne linki',
  fields: [
    defineField({
      name: 'hasSubmenu',
      type: 'boolean',
      title: 'Zawiera podlinki?',
      description: 'Zaznacz tę opcję, jeśli ten element menu będzie zawierał grupę linków do podstron.',
      initialValue: false,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'link',
      type: 'reference',
      title: 'Wewnętrzne odniesienie do strony',
      to: InternalLinkableTypes,
      options: {
        disableNew: true,
        filter: 'defined(slug.current)',
      },
      hidden: ({ parent }) => parent?.hasSubmenu,
      validation: Rule =>
        Rule.custom((value, context) => {
          const hasSubmenu = (context.parent as { hasSubmenu: boolean })?.hasSubmenu;
          if (!hasSubmenu && !value) return 'Link jest wymagany';
          return true;
        }),
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Wyświetlana nazwa (opcjonalna)',
      hidden: ({ parent }) => parent?.hasSubmenu,
      description: 'Jeśli nie podasz nazwy, zostanie użyta domyślna nazwa zdefiniowana w podstronach.',
    }),
    defineField({
      name: 'submenuName',
      type: 'string',
      title: 'Nazwa dla grupy linków',
      hidden: ({ parent }) => !parent?.hasSubmenu,
      validation: Rule =>
        Rule.custom((value, context) => {
          const hasSubmenu = (context.parent as { hasSubmenu: boolean })?.hasSubmenu;
          if (hasSubmenu && !value) return 'Nazwa dla grupy linków jest wymagana.';
          return true;
        }),
    }),
    defineField({
      name: 'submenuLinks',
      type: 'array',
      title: 'Linki',
      hidden: ({ parent }) => !parent?.hasSubmenu,
      of: [
        defineField({
          name: 'submenuLink',
          type: 'object',
          title: 'Link do strony',
          fields: [
            defineField({
              name: 'link',
              type: 'reference',
              title: 'Wewnętrzne odniesienie do strony',
              to: InternalLinkableTypes,
              options: {
                disableNew: true,
                filter: filterUniqueReferences,
              },
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'name',
              type: 'string',
              title: 'Wyświetlana nazwa (opcjonalna)',
              description: 'Jeśli nie podasz nazwy, zostanie użyta domyślna nazwa zdefiniowana w podstronach.',
            }),
          ],
          validation: Rule =>
            Rule.custom((value, context) => {
              const hasSubmenu = (context?.parent as { hasSubmenu?: boolean })?.hasSubmenu || false;
              if (hasSubmenu && !value) return 'Referencja do wewnętrznej strony jest wymagana';
              return true;
            }),
          preview: {
            select: {
              linkName: 'link.name',
              slug: 'link.slug.current',
              image: 'link.image',
              name: 'name',
            },
            prepare: ({ linkName, slug, image, name }) => ({
              title: `${name ? name : linkName}`,
              subtitle: slug,
              media: image,
              icon: () => '🔗',
            }),
          },
        }),
      ],
      validation: Rule =>
        Rule.custom((value, context) => {
          const hasSubmenu = (context?.parent as { hasSubmenu?: boolean })?.hasSubmenu || false;
          if (hasSubmenu && (!value || value.length < 1)) return 'Należy dodać co najmniej jeden link.';
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      hasSubmenu: 'hasSubmenu',
      linkName: 'link.name',
      slug: 'link.slug.current',
      name: 'name',
      submenuName: 'submenuName',
    },
    prepare: ({ hasSubmenu, linkName, slug, name, submenuName }) => ({
      title: `${hasSubmenu ? submenuName : name ? name : linkName}`,
      subtitle: `${hasSubmenu ? 'Grupa linków' : slug}`,
      icon: () => '🔗',
    }),
  },
});
