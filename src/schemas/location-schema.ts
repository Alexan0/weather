import { z } from 'zod';

export const weatherLocationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  name: z.string(),
  source: z.enum(['fallback', 'geolocation', 'search'])
});
