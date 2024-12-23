import { MetadataRoute } from 'next';
import {
  BACKGROUND_COLOR,
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  DOMAIN,
  SHORT_TITLE,
  THEME_COLOR,
} from '@/global/constants';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: DEFAULT_TITLE,
    short_name: SHORT_TITLE,
    description: DEFAULT_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: BACKGROUND_COLOR,
    theme_color: THEME_COLOR,
    icons: [
      {
        src: `${DOMAIN}/icon-192.png`,
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: `${DOMAIN}/icon-512.png`,
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
