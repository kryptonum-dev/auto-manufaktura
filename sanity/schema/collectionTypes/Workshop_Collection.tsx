import { defineField, defineType } from 'sanity';
import { validatePhoneNumber } from '../../utils/validate-phone-number';

const name = 'Workshop_Collection';
const title = 'Warsztaty i działy';
const icon = () => '🏭';

export default defineType({
  name: name,
  type: 'document',
  title,
  icon,
  fields: [
    defineField({
      name: 'type',
      title: 'Zaznacz, czy jest to dział czy warsztat?',
      type: 'string',
      options: {
        list: [
          { title: 'Warsztat', value: 'workshop' },
          { title: 'Dział', value: 'department' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: Rule => Rule.required(),
      initialValue: 'workshop',
    }),
    defineField({
      name: 'workshop',
      type: 'reference',
      title: 'Wybierz warsztat, do którego należy dział',
      hidden: ({ parent }) => parent.type !== 'department',
      to: [{ type: 'Workshop_Collection' }],
      options: {
        disableNew: true,
        filter: 'type == "workshop"',
      },
      validation: Rule =>
        Rule.custom((value, context) => {
          const type = (context.parent as { type: string })?.type;
          if (type === 'department' && !value) return 'Warsztat jest wymagany';
          return true;
        }),
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Nazwa działu',
      hidden: ({ parent }) => parent.type !== 'department',
      validation: Rule =>
        Rule.custom((value, context) => {
          const type = (context.parent as { type: string })?.type;
          if (type === 'department' && !value) return 'Nazwa działu jest wymagana';
          return true;
        }),
    }),
    defineField({
      name: 'fullName',
      type: 'string',
      title: 'Pełna nazwa działu',
      description: 'Pełna, bardziej formalna nazwa działu, np. "Dział skrzyń biegów"',
      hidden: ({ parent }) => parent.type !== 'department',
      validation: Rule =>
        Rule.custom((value, context) => {
          const type = (context.parent as { type: string })?.type;
          if (type === 'department' && !value) return 'Pełna nazwa działu jest wymagana';
          return true;
        }),
    }),
    defineField({
      name: 'address',
      type: 'object',
      title: 'Adres',
      hidden: ({ parent }) => parent.type !== 'workshop',
      fields: [
        defineField({
          name: 'street',
          type: 'string',
          title: 'Ulica i numer lokalu',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'postalCode',
          type: 'string',
          title: 'Kod pocztowy',
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
      validation: Rule =>
        Rule.custom((value, context) => {
          const type = (context.parent as { type: string })?.type;
          if (type === 'workshop' && !value) return 'Dane adresowe są wymagane';
          return true;
        }),
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
      hidden: ({ parent }) => parent.type !== 'workshop',
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
      validation: Rule =>
        Rule.custom((value, context) => {
          const type = (context.parent as { type: string })?.type;
          if (type === 'workshop' && !value) return 'Godziny otwarcia są wymagane';
          return true;
        }),
    }),
    defineField({
      name: 'googleData',
      type: 'object',
      title: 'Dane Google',
      hidden: ({ parent }) => parent.type !== 'workshop',
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
      validation: Rule =>
        Rule.custom((value, context) => {
          const type = (context.parent as { type: string })?.type;
          if (type === 'workshop' && !value) return 'Dane google są wymagane';
          return true;
        }),
    }),
  ],
  validation: Rule => Rule.required(),
  preview: {
    select: {
      street: 'address.street',
      city: 'address.city',
      media: 'address.mapImage',
      fullName: 'fullName',
      type: 'type',
      email: 'email',
      tel: 'tel',
    },
    prepare: ({ type, fullName, street, city, media, email, tel }) => ({
      title: type === 'workshop' ? `${street}, ${city}` : fullName,
      subtitle: `${email} | ${tel}`,
      media,
      icon,
    }),
  },
});
