import type { MetadataRoute } from 'next';

import { BASE_PATH, getPublicAssetPath } from '@/config/base-path';
import { APP_PAGES } from '@/config/pages';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: `${BASE_PATH}/`,
    name: 'Weather',
    short_name: 'Weather',
    description: 'Current weather and forecast for your favorite cities',
    start_url: `${BASE_PATH}/`,
    scope: `${BASE_PATH}/`,
    display: 'standalone',
    background_color: '#08090b',
    theme_color: '#08090b',
    categories: ['weather', 'utilities'],
    lang: 'en',
    icons: [
      {
        src: getPublicAssetPath('/icons/icon-192x192.png'),
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: getPublicAssetPath('/icons/icon-512x512.png'),
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: getPublicAssetPath('/icons/icon-512x512-maskable.png'),
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    shortcuts: [
      {
        name: 'Saved cities',
        short_name: 'Saved',
        description: 'Open your saved cities',
        url: `${BASE_PATH}${APP_PAGES.SAVED.path}/`,
        icons: [
          {
            src: getPublicAssetPath('/icons/icon-192x192.png'),
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    ]
  };
}
