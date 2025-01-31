export interface LoginFormFields {
    username: string;
    password: string;
    rememberMe?: boolean;
}
export interface TokenPayload {
    id: number;
    username: string;
    role: string;
    exp: number;
}
export interface TokenPayloadItems {
    "user_id": number;
    "username": string;
    "role": string;
    "exp": number;
}