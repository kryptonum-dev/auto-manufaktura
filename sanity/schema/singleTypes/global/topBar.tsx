import { defineField } from 'sanity';
import { filterUniqueReferences } from '../../../utils/filter-unique-references';
import { validatePhoneNumber } from '../../../utils/validate-phone-number';

const ContactFields = [
  defineField({
    name: 'name',
    type: 'string',
    title: 'Nazwa',
    validation: Rule => Rule.required(),
  }),
  defineField({
    name: 'tel',
    type: 'string',
    title: 'Numer telefonu',
    validation: Rule => Rule.custom(validatePhoneNumber).required(),
  }),
];

export default defineField({
  name: 'topBar',
  type: 'object',
  title: 'Pasek kontaktowy nad nawigacją',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'isReference',
      type: 'boolean',
      title: 'Referencja do warsztatów?',
      initialValue: false,
      description: (
        <>
          Jeśli zaznaczysz tę opcję, będziesz mieć możliwość odwołania się do danych kontaktowych z{' '}
          <a
            href='/structure/Workshop_Collection'
            target='_blank'
            rel='noopener'
          >
            kolekcji warsztatów
          </a>
          . Wybierając tę opcję, dane kontaktowe, takie jak numer telefonu i adres warsztatu, będą automatycznie
          pobierane z kolekcji.
        </>
      ),
    }),
    defineField({
      name: 'workshopsReferences',
      type: 'array',
      title: 'Warsztaty',
      description:
        'Wybierz warsztaty, których dane kontaktowe (adres i numer telefonu) mają pojawić się w pasku kontaktowym.',
      of: [
        defineField({
          name: 'workshop',
          type: 'reference',
          title: 'Referencja do warsztatu',
          to: { type: 'Workshop_Collection' },
          options: {
            disableNew: true,
            filter: filterUniqueReferences(),
          },
        }),
      ],
      hidden: ({ parent }) => !parent?.isReference,
      validation: Rule =>
        Rule.custom((value, context) => {
          const isReference = (context.parent as { isReference: boolean })?.isReference;
          if (!isReference) return true;
          if (!value || value.length < 1 || value.length > 2)
            return 'Wymagane jest dodanie od 1 do 2 warsztatów do kontaktu.';
          return true;
        }),
    }),
    defineField({
      name: 'contacts',
      type: 'array',
      title: 'Lista kontaktów',
      description: 'Dodaj dane kontaktowe, które pojawią się w pasku kontaktowym.',
      of: [
        defineField({
          name: 'contact',
          type: 'object',
          title: 'Dane kontaktowe',
          fields: ContactFields,
          options: {
            columns: 2,
          },
          preview: {
            select: {
              name: 'name',
              tel: 'tel',
            },
            prepare: ({ name, tel }) => ({
              title: name,
              subtitle: tel,
              icon: () => '📞',
            }),
          },
        }),
      ],
      hidden: ({ parent }) => parent?.isReference,
      validation: Rule =>
        Rule.custom((value, context) => {
          const isReference = (context.parent as { isReference: boolean })?.isReference;
          if (isReference) return true;
          if (!value || value.length < 1 || value.length > 2) return 'Wymagane jest dodanie od 1 do 2 kontaktów.';
          return true;
        }),
    }),
    defineField({
      name: 'annotation',
      type: 'Heading',
      title: 'Adnotacja (opcjonalna)',
      description:
        'Wprowadź dodatkowy tekst, który będzie wyświetlany w górnym pasku kontaktowym nad nawigacją, np. "Otwarte Pn-Sob".',
    }),
    defineField({
      name: 'additionalContact',
      type: 'object',
      title: 'Dodatkowy kontakt (opcjonalny)',
      description:
        'Wprowadź dodatkowe dane kontaktowe, które pojawią się w pasku nad nawigacją (np. kontakt do wybranego działu).',
      fields: ContactFields,
      options: {
        columns: 2,
      },
    }),
  ],
  validation: Rule => Rule.required(),
});
