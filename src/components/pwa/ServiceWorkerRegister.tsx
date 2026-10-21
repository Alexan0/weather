'use client';

import { useEffect } from 'react';

import { BASE_PATH, getPublicAssetPath } from '@/config/base-path';

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) {
      return;
    }

    const registerServiceWorker = () => {
      navigator.serviceWorker
        .register(getPublicAssetPath('/sw.js'), {
          scope: `${BASE_PATH}/`,
          updateViaCache: 'none'
        })
        .catch(() => undefined);
    };

    if (document.readyState === 'complete') {
      registerServiceWorker();
      return;
    }

    window.addEventListener('load', registerServiceWorker, { once: true });

    return () => window.removeEventListener('load', registerServiceWorker);
  }, []);

  return null;
}
