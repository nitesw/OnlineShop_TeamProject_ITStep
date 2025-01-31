import {jwtDecode} from "jwt-decode";
import {TokenPayload, TokenPayloadItems} from "../models/accounts.ts";

const accessTokenKey = "access-token";
const refreshTokenKey = "refresh-token";

export const tokenService = {
    saveTokens(accessToken: string, refreshToken: string, rememberMe: boolean) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem(accessTokenKey, accessToken);
        storage.setItem(refreshTokenKey, refreshToken);
    },
    getAccessToken(): string | null {
        return localStorage.getItem(accessTokenKey) || sessionStorage.getItem(accessTokenKey);
    },
    getRefreshToken(): string | null {
        return localStorage.getItem(refreshTokenKey) || sessionStorage.getItem(refreshTokenKey);
    },
    clearTokens(): void {
        localStorage.removeItem(accessTokenKey);
        localStorage.removeItem(refreshTokenKey);
        sessionStorage.removeItem(accessTokenKey);
        sessionStorage.removeItem(refreshTokenKey);
    },
    getPayload(): TokenPayload | null {
        const accessToken = this.getAccessToken();
        if (!accessToken) return null;

        try {
            const payload = jwtDecode<TokenPayloadItems>(accessToken);
            return {
                id: payload["user_id"],
                username: payload["username"],
                role: payload["role"],
                exp: payload["exp"],
            };
        } catch (e) {
            console.error("Error decoding access token", e);
            return null;
        }
    }
};
