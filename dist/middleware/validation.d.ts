import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import type { ApiResponse } from '../utils/apiResponse.js';
export declare function validate(schema: z.ZodType): (req: Request, res: Response<ApiResponse>, next: NextFunction) => void;
//# sourceMappingURL=validation.d.ts.map