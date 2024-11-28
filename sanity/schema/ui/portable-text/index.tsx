import { defineField } from 'sanity';
import { CustomInput } from './CustomInput';
import { isValidUrl } from '../../../utils/is-valid-url';
import { InternalLinkableTypes } from '../../../structure/internal-linkable-types';

type PortableTextPropsTypes = {
  name?: string;
  title?: string;
  allowHeadings?: boolean;
  useCustomInput?: boolean;
  components?: any[];
};

export const PortableText = ({
  name,
  title,
  allowHeadings = false,
  useCustomInput = true,
  components = [],
}: PortableTextPropsTypes) =>
  defineField({
    name: name || 'PortableText',
    type: 'array',
    title: title || 'Formatowalny blok tekstowy',
    components: {
      // @ts-ignore
      input: useCustomInput ? CustomInput : null,
    },
    of: [
      defineField({
        type: 'block',
        name: 'block',
        styles: [
          { title: 'Normalny', value: 'normal' },
          ...(allowHeadings
            ? [
                {
                  title: 'Nagłówek 2',
                  value: 'h2',
                  component: ({ children }: { children: React.ReactNode }) => (
                    <h2 style={{ fontSize: '1.875rem', fontWeight: 400, margin: 0 }}>{children}</h2>
                  ),
                },
                {
                  title: 'Nagłówek 3',
                  value: 'h3',
                  component: ({ children }: { children: React.ReactNode }) => (
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 400, margin: 0 }}>{children}</h3>
                  ),
                },
              ]
            : []),
        ],
        lists: [
          { title: 'Lista wypunktowana', value: 'bullet' },
          { title: 'Lista numerowana', value: 'number' },
        ],
        marks: {
          decorators: [
            {
              title: 'Pogrubiony',
              value: 'strong',
              component: ({ children }) => <strong style={{ fontWeight: 700 }}>{children}</strong>,
            },
            { title: 'Kursywa', value: 'em' },
            { title: 'Podkreślenie', value: 'underline' },
          ],
          annotations: [
            defineField({
              name: 'link',
              type: 'object',
              title: 'Link',
              icon: () => '🔗',
              fields: [
                defineField({
                  name: 'linkType',
                  type: 'string',
                  title: 'Typ linku',
                  description:
                    'Wybierz "Zewnętrzny" dla odnośników do stron spoza Twojej domeny lub "Wewnętrzny" dla odnośników do stron w obrębie Twojej strony',
                  options: {
                    list: [
                      { value: 'external', title: 'Zewnętrzny' },
                      { value: 'internal', title: 'Wewnętrzny' },
                    ],
                    layout: 'radio',
                    direction: 'horizontal',
                  },
                  initialValue: 'external',
                }),
                defineField({
                  name: 'external',
                  type: 'string',
                  title: 'Adres URL',
                  description:
                    'Podaj pełny adres URL. Upewnij się, że zaczyna się od protokołu "https://", "mailto:" lub "tel:".',
                  hidden: ({ parent }) => parent?.linkType !== 'external',
                  validation: Rule => [
                    Rule.custom((value, { parent }) => {
                      const linkType = (parent as { linkType?: string })?.linkType;
                      if (linkType !== 'external') return true;

                      if (!value) return 'Adres URL jest wymagany';
                      if (!value.startsWith('https://') && !value.startsWith('mailto:') && !value.startsWith('tel:')) {
                        return 'Zewnętrzny link musi zaczynać się od protokołu  "https://", "mailto:" or "tel:"';
                      }
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
                  validation: rule => [
                    rule.custom((value, { parent }) => {
                      const linkType = (parent as { linkType?: string })?.linkType;
                      if (linkType === 'internal' && !value?._ref)
                        return 'Musisz wybrać wewnętrzną stronę do odniesienia.';
                      return true;
                    }),
                  ],
                }),
              ],
            }),
          ],
        },
      }),
      ...components,
    ],
  });

export default PortableText({});
