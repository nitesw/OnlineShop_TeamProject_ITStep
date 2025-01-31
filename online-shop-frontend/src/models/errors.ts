export interface APIError extends Error {
    status?: number;
    data?: {
        detail?: string;
    };
}