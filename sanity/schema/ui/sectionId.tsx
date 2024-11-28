import { defineField } from 'sanity';
import { slugify } from '../../utils/slugify';

type Props = {
  _key: string;
  sectionId?: string;
};

export default [
  defineField({
    name: 'sectionId',
    type: 'string',
    title: 'ID sekcji (opcjonalne)',
    description: 'ID sekcji to unikalny identyfikator używany do linkowania konkretnych sekcji strony.',
    validation: Rule =>
      Rule.custom((value, context) => {
        if (!value) return true;
        if (slugify(value) !== value) {
          return 'ID sekcji musi zawierać tylko małe litery, cyfry i myślniki (bez znaków specjalnych). Nie może zaczynać się ani kończyć myślnikiem.';
        }

        const components = (context.document?.components || []) as Props[];
        const currentComponent = context.parent as Props;
        const isDuplicate = components.some(
          component => component._key !== currentComponent._key && component.sectionId === value
        );
        if (isDuplicate) return 'Podane ID sekcji jest już używane w innym komponencie. ID sekcji muszą być unikalne.';

        return true;
      }),
  }),
];
