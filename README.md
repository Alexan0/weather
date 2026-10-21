# Weather

Weather is a responsive weather dashboard for mobile, desktop, and installable PWA use. It uses Open-Meteo for forecasts and city search, validates external responses with Zod, and caches requests with TanStack Query. No API key is required.

## Features

- location request on first use, with Moscow as the fallback;
- city search with debouncing, request cancellation, and recent cities;
- current conditions, feels-like temperature, daily high and low;
- hourly and seven-day forecast tabs;
- rain probability, UV index, wind, and humidity highlights;
- Celsius and Fahrenheit display with a saved preference;
- system, light, dark, green, blue, purple, red, and orange themes;
- up to 20 saved cities stored locally, with filtering and per-city forecasts;
- responsive loading, error, empty, and offline states;
- static export compatible with GitHub Pages;
- PWA manifest, app icons, service worker, and cached weather responses.

## Stack

- Next.js 16 App Router and React 19;
- TypeScript;
- Tailwind CSS 4 and Sass;
- TanStack Query;
- Zod;
- Recharts;
- next-themes;
- Radix Select;
- Lucide for interface icons and local Meteocons SVG files for weather states;

## Local development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Run the project checks:

```bash
npm run lint
npm run build
```

The app uses a static export. To preview the production output locally, build it first and then start the bundled static server:

```bash
npm run build
npm run start
```

## GitHub Pages

Set `NEXT_PUBLIC_BASE_PATH` to the repository name when building a project page. For a repository named `weather`:

```bash
NEXT_PUBLIC_BASE_PATH=/weather npm run build
```

On Windows PowerShell:

```powershell
$env:NEXT_PUBLIC_BASE_PATH='/weather'
npm run build
```

Publish the generated `out` directory with a GitHub Pages workflow. The configured base path is applied to Next.js assets, the manifest, service worker, favicon, PWA icons, and weather SVG files. A user or organization page hosted at the domain root can build without `NEXT_PUBLIC_BASE_PATH`.

Geolocation and PWA installation require HTTPS in production. GitHub Pages provides HTTPS.

## Architecture

```text
app/                  routes, root layout, manifest, and global styles
src/components/       shared layout, providers, PWA, weather, and UI components
src/features/         isolated page features and feature-local utilities
src/hooks/            reusable client hooks
src/config/           shared application and query configuration
src/constants/        shared constants and query keys
src/utils/            pure helpers and local-storage adapters
src/types/            application-level TypeScript types
src/schemas/          Zod schemas for external data
src/services/         Open-Meteo and browser geolocation clients
src/lib/              library adapters such as cn
public/                service worker, PWA assets, and local weather icons
```

Features do not import from one another. Shared components, hooks, types, configuration, and utilities live in global folders. Open-Meteo responses are validated before they reach the UI. Saved, selected, and recent city storage have separate adapters and all saved-city consumers use TanStack Query as their in-memory source of truth.

## Data and persistence

Open-Meteo provides forecast and geocoding data. The application stores only these browser preferences in localStorage:

- selected city;
- five recent cities;
- up to 20 saved cities;
- temperature unit;
- theme.

The service worker uses cache-first handling for static assets and a network-first strategy with cached fallback for Open-Meteo requests.

## Credits

Weather data is provided by [Open-Meteo](https://open-meteo.com/). Weather artwork is stored in `public/weather-icons`; its license is included in `public/weather-icons/LICENSE.md`.
