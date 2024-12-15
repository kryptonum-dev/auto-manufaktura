import { defineType } from 'sanity';

import CarBrandsList from './components/CarBrandsList';
import FullServicesList from './components/FullServicesList';
import SelectedServicesList from './components/SelectedServicesList';
import Reviews from './components/Reviews';
import Faq from './components/Faq';
import ContactForm from './components/ContactForm';
import Prices from './components/Prices';

export default defineType({
  name: 'components',
  type: 'array',
  title: 'Komponenty',
  of: [CarBrandsList, FullServicesList, SelectedServicesList, Reviews, Faq, ContactForm, Prices],
  options: {
    insertMenu: {
      filter: true,
      showIcons: true,
      views: [
        {
          name: 'grid',
          previewImageUrl: schemaTypeName => `/static/components/${schemaTypeName}.webp`,
        },
        { name: 'list' },
      ],
    },
  },
});
