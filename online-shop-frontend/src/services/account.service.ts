import { tokenService } from "./token.service.ts";

export const accountService = {
    login(accessToken: string, refreshToken: string, rememberMe: boolean) {
        tokenService.saveTokens(accessToken, refreshToken, rememberMe);
    },
    logout() {
        tokenService.clearTokens();
    },
    getRefreshToken() {
        return tokenService.getRefreshToken();
    },
    getAccessToken() {
        return tokenService.getAccessToken();
    }
};
