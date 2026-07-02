export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
    errors?: string[];
}
export declare function successResponse<T>(data: T, message?: string): ApiResponse<T>;
export declare function errorResponse(message: string, errors?: string[]): ApiResponse;
//# sourceMappingURL=apiResponse.d.ts.map