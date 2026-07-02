import { z } from 'zod';
import { MAX_URL_LENGTH } from '../utils/constants.js';
export const createUrlSchema = z.object({
    url: z
        .string()
        .min(1, 'URL is required')
        .max(MAX_URL_LENGTH, `URL must be less than ${MAX_URL_LENGTH} characters`)
        .url('Invalid URL format'),
});
//# sourceMappingURL=urlSchema.js.map