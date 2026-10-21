import type { z } from 'zod';

import { weatherForecastSchema } from '@/schemas/weather-schema';

export type WeatherForecast = z.infer<typeof weatherForecastSchema>;
