export interface CreateUrlResult {
    originalUrl: string;
    shortCode: string;
    shortUrl: string;
}
export declare function createShortUrl(originalUrl: string): Promise<CreateUrlResult>;
export declare function getUrlByCode(shortCode: string): Promise<{
    id: string;
    originalUrl: string;
    shortCode: string;
    clicks: number;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date | null;
} | null>;
export declare function trackClick(shortCode: string): Promise<{
    id: string;
    originalUrl: string;
    shortCode: string;
    clicks: number;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date | null;
}>;
export declare function getUrlInfo(shortCode: string): Promise<{
    originalUrl: string;
    shortCode: string;
    clicks: number;
    createdAt: Date;
    expiresAt: Date | null;
} | null>;
export declare function deleteUrl(shortCode: string): Promise<boolean>;
//# sourceMappingURL=urlService.d.ts.map