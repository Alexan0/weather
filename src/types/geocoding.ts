import type { z } from 'zod';

import type { geocodingResultSchema } from '@/schemas/geocoding-schema';

export type GeocodingResult = z.infer<typeof geocodingResultSchema>;
