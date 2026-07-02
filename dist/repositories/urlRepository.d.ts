export interface CreateUrlData {
    originalUrl: string;
    shortCode: string;
    expiresAt?: Date | null;
}
export declare function create(data: CreateUrlData): Promise<{
    id: string;
    originalUrl: string;
    shortCode: string;
    clicks: number;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date | null;
}>;
export declare function findByShortCode(shortCode: string): Promise<{
    id: string;
    originalUrl: string;
    shortCode: string;
    clicks: number;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date | null;
} | null>;
export declare function findByOriginalUrl(originalUrl: string): Promise<{
    id: string;
    originalUrl: string;
    shortCode: string;
    clicks: number;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date | null;
} | null>;
export declare function incrementClicks(shortCode: string): Promise<{
    id: string;
    originalUrl: string;
    shortCode: string;
    clicks: number;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date | null;
}>;
export declare function remove(shortCode: string): Promise<{
    id: string;
    originalUrl: string;
    shortCode: string;
    clicks: number;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date | null;
}>;
//# sourceMappingURL=urlRepository.d.ts.map