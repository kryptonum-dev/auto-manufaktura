import { defineField, defineType } from 'sanity';
import { Tooltip, Box, Text } from '@sanity/ui';
import { isValidUrl } from '../../utils/is-valid-url';
import { InternalLinkableTypes } from '../../structure/internal-linkable-types';

const name = 'cta';
const title = 'Przycisk (CTA)';
const icon = () => '👆';

export default defineType({
  name,
  type: 'object',
  title,
  icon,
  fields: [
    defineField({
      name: 'text',
      type: 'string',
      title: 'Tekst',
      description: 'Tekst, który będzie wyświetlony na przycisku.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'linkType',
      type: 'string',
      title: 'Typ przycisku',
      description: (
        <>
          <em>Zewnętrzny</em> (inne strony internetowe) lub <em>Wewnętrzny</em> (w obrębie Twojej strony)
        </>
      ),
      options: {
        list: [
          { value: 'external', title: 'Zewnętrzny' },
          { value: 'internal', title: 'Wewnętrzny' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
      fieldset: 'style',
    }),
    defineField({
      name: 'theme',
      type: 'string',
      title: 'Wygląd',
      description: (
        <>
          <em>Primary</em> (główny przycisk), <em>Secondary</em> (drugorzędny przycisk)
        </>
      ),
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
      fieldset: 'style',
    }),
    defineField({
      name: 'external',
      type: 'string',
      title: 'Adres URL',
      description: 'Podaj pełny adres URL. Upewnij się, że zaczyna się od "https://" i jest prawidłowym adresem URL.',
      hidden: ({ parent }) => parent?.linkType !== 'external',
      validation: Rule => [
        Rule.custom((value, { parent }) => {
          const linkType = (parent as { linkType?: string })?.linkType;
          if (linkType !== 'external') return true;

          if (!value) return 'Adres URL jest wymagany';
          if (!value.startsWith('https://')) return 'Link zewnętrzny musi zaczynać się od protokołu "https://"';
          if (!isValidUrl(value)) return 'Nieprawidłowy adres URL';
          return true;
        }),
      ],
    }),
    defineField({
      name: 'internal',
      type: 'reference',
      title: 'Wewnętrzne odniesienie do strony',
      description: 'Wybierz wewnętrzną stronę, do której chcesz się odnieść.',
      to: InternalLinkableTypes,
      options: {
        disableNew: true,
        filter: 'defined(slug.current)',
      },
      hidden: ({ parent }) => parent?.linkType !== 'internal',
      validation: Rule => [
        Rule.custom((value, { parent }) => {
          const linkType = (parent as { linkType?: string })?.linkType;
          if (linkType === 'internal' && !value?._ref) return 'Musisz wybrać wewnętrzną stronę do odniesienia.';
          return true;
        }),
      ],
    }),
  ],
  fieldsets: [
    {
      name: 'style',
      title: 'Styl',
      options: {
        columns: 2,
      },
    },
  ],
  preview: {
    select: {
      title: 'text',
      theme: 'theme',
      linkType: 'linkType',
      external: 'external',
      internal: 'internal.slug.current',
    },
    prepare({ title, theme, linkType, external, internal }) {
      const isExternal = linkType === 'external';
      const icon = isExternal ? '🌐' : '🔗';
      return {
        title: `${title}`,
        subtitle: isExternal ? external : internal,
        media: () => (
          <Tooltip
            content={
              <Box padding={1}>
                <Text size={1}>
                  {icon} {isExternal ? 'Link zewnętrzny' : 'Link wewnętrzny'}
                  &nbsp;|&nbsp;
                  {theme === 'primary' ? 'Primary (główny)' : 'Secondary (drugorzędny)'}
                </Text>
              </Box>
            }
            placement='top'
            portal
          >
            <span>{icon}</span>
          </Tooltip>
        ),
      };
    },
  },
});
