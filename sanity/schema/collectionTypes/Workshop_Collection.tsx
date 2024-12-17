import { defineField, defineType } from 'sanity';
import { validatePhoneNumber } from '../../utils/validate-phone-number';

const name = 'Workshop_Collection';
const title = 'Warsztaty';
const icon = () => '🏭';

const Department = defineField({
  name: 'department',
  type: 'object',
  title: 'Dział',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Nazwa działu (krótka)',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'fullName',
      type: 'string',
      title: 'Pełna nazwa działu',
      description: 'Pełna, bardziej formalna nazwa działu, np. "Dział skrzyń biegów"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'email',
      type: 'email',
      title: 'Adres e-mail',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'tel',
      type: 'string',
      title: 'Numer telefonu',
      validation: Rule => Rule.custom(validatePhoneNumber).required(),
    }),
  ],
  validation: Rule => Rule.required(),
  preview: {
    select: {
      name: 'name',
      email: 'email',
      tel: 'tel',
    },
    prepare: ({ name, email, tel }) => ({
      title: name,
      subtitle: `${email} | ${tel}`,
      icon: () => '🏢',
    }),
  },
});

export default defineType({
  name: name,
  type: 'document',
  title,
  icon,
  fields: [
    defineField({
      name: 'address',
      type: 'object',
      title: 'Adres',
      fields: [
        defineField({
          name: 'street',
          type: 'string',
          title: 'Ulica i numer lokalu',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'city',
          type: 'string',
          title: 'Miasto',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'mapImage',
          type: 'image',
          title: 'Obrazek mapy',
          description: 'Obrazek mapy, który pojawi się obok formularza kontaktowego.',
          validation: Rule => Rule.required(),
        }),
      ],
      options: {
        collapsible: true,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'email',
      type: 'email',
      title: 'Adres e-mail',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'tel',
      type: 'string',
      title: 'Numer telefonu',
      validation: Rule => Rule.custom(validatePhoneNumber).required(),
    }),
    defineField({
      name: 'openingHours',
      type: 'array',
      title: 'Godziny otwarcia',
      description: 'Godziny otwarcia zostaną wyświetlone obok formularza kontaktowego',
      of: [
        defineField({
          name: 'openingHoursRange',
          type: 'object',
          title: 'Zakres godzin otwarcia',
          fields: [
            defineField({
              name: 'days',
              type: 'string',
              title: 'Dni',
              description: 'Określ dni, w których firma jest otwarta (np. "Pon-Pt", "Sob").',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'hours',
              type: 'string',
              title: 'Godziny',
              description: 'Określ godziny otwarcia firmy (np. "9:00-17:00").',
              validation: Rule => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'days',
              subtitle: 'hours',
            },
            prepare: ({ title, subtitle }) => ({
              title,
              subtitle,
              icon: () => '🕒',
            }),
          },
        }),
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'hasDepartments',
      type: 'boolean',
      title: 'Czy lokalizacja posiada działy?',
      initialValue: false,
    }),
    defineField({
      name: 'departments',
      type: 'array',
      title: 'Działy',
      description: 'Wprowadź dodatkowe działy firmy, poza działem ogólnym.',
      of: [Department],
      hidden: ({ parent }) => !parent?.hasDepartments,
    }),
    defineField({
      name: 'googleData',
      type: 'object',
      title: 'Dane Google',
      fields: [
        defineField({
          name: 'rating',
          type: 'number',
          title: 'Ocena (1.0 - 5.0)',
          fieldset: 'rating',
          validation: Rule =>
            Rule.required().max(5).min(1).error('Ocena jest wymagana i musi mieścić się w przedziale od 1.0 do 5.0'),
        }),
        defineField({
          name: 'userRatingsTotal',
          type: 'number',
          title: 'Liczba recenzji',
          fieldset: 'rating',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'url',
          type: 'url',
          title: 'Link do Google Maps',
          validation: Rule =>
            Rule.uri({ scheme: ['https'] })
              .error('Podaj prawidłowy adres URL (rozpoczynający się od https://)')
              .required(),
        }),
      ],
      fieldsets: [
        {
          name: 'rating',
          title: 'Ocena',
          options: { columns: 2 },
        },
      ],
      options: { collapsed: true, collapsible: true },
      validation: Rule => Rule.required().error('Dane google są wymagane'),
    }),
  ],
  validation: Rule => Rule.required(),
  preview: {
    select: {
      street: 'address.street',
      city: 'address.city',
      media: 'address.mapImage',
      email: 'email',
      tel: 'tel',
    },
    prepare: ({ street, city, media, email, tel }) => ({
      title: `${street}, ${city}`,
      subtitle: `${email} | ${tel}`,
      media,
      icon,
    }),
  },
});
