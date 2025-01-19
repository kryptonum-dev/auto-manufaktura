import { defineField } from 'sanity';
import { filterUniqueReferences } from '../../../utils/filter-unique-references';

export default defineField({
  name: 'topBar',
  type: 'object',
  title: 'Pasek kontaktowy nad nawigacją',
  options: { collapsible: true, collapsed: true },
  fields: [
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
            filter: filterUniqueReferences('type == "workshop"'),
          },
        }),
      ],
      validation: Rule => Rule.required().min(1).max(2),
    }),
    defineField({
      name: 'additionalContact',
      type: 'reference',
      title: 'Dodatkowy kontakt do wybranego działu (opcjonalny)',
      to: [{ type: 'Workshop_Collection' }],
      options: {
        disableNew: true,
        filter: 'type == "department"',
      },
    }),
    defineField({
      name: 'annotation',
      type: 'Heading',
      title: 'Adnotacja (opcjonalna)',
      description:
        'Wprowadź dodatkowy tekst, który będzie wyświetlany w górnym pasku kontaktowym nad nawigacją, np. "Otwarte Pn-Sob".',
    }),
  ],
  validation: Rule => Rule.required(),
});
