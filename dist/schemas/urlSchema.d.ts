import { z } from 'zod';
export declare const createUrlSchema: z.ZodObject<{
    url: z.ZodString;
}, z.core.$strip>;
export type CreateUrlInput = z.infer<typeof createUrlSchema>;
//# sourceMappingURL=urlSchema.d.ts.map