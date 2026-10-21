import './globals.css';
import './animations.scss';

import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';

import { Footer, Header, WeatherBackground } from '@/components/layout';
import { QueryProvider, SavedCityFilterProvider, TemperatureUnitProvider, ThemeProvider } from '@/components/providers';
import { OfflineIndicator } from '@/components/pwa/OfflineIndicator';
import { ServiceWorkerRegister } from '@/components/pwa/ServiceWorkerRegister';

import { getPublicAssetPath } from '@/config/base-path';

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin']
});

export const metadata: Metadata = {
  applicationName: 'Weather',
  title: 'Weather',
  description: 'Current weather and forecast for your favorite cities',
  formatDetection: {
    telephone: false
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Weather'
  },
  icons: {
    icon: getPublicAssetPath('/icon.svg'),
    apple: getPublicAssetPath('/icons/apple-touch-icon.png')
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f8fa' },
    { media: '(prefers-color-scheme: dark)', color: '#08090b' }
  ]
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang='en'
      className={`${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className='flex min-h-full flex-col'>
        <QueryProvider>
          <ThemeProvider>
            <TemperatureUnitProvider>
              <SavedCityFilterProvider>
                <div className='app-shell relative flex min-h-svh flex-col overflow-hidden bg-background text-foreground'>
                  <WeatherBackground />
                  <div className='relative z-10 flex min-h-0 flex-1 flex-col'>
                    <Header />
                    {children}
                    <Footer />
                  </div>
                </div>
                <OfflineIndicator />
                <ServiceWorkerRegister />
              </SavedCityFilterProvider>
            </TemperatureUnitProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
