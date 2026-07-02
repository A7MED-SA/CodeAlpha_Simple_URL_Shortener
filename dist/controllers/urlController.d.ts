import type { Request, Response } from 'express';
import type { ApiResponse } from '../utils/apiResponse.js';
export declare function createShortUrl(req: Request, res: Response<ApiResponse>): Promise<void>;
export declare function redirectToUrl(req: Request, res: Response): Promise<void>;
export declare function getUrlInfo(req: Request, res: Response<ApiResponse>): Promise<void>;
export declare function deleteUrl(req: Request, res: Response<ApiResponse>): Promise<void>;
//# sourceMappingURL=urlController.d.ts.map