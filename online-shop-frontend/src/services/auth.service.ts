import axios from "axios";
import { tokenService } from "./token.service.ts";
import {APP_ENV} from "../env";

const axiosBase = axios.create({
    baseURL: `${APP_ENV.REMOTE_BASE_URL}`,
});

export const authService = async () => {
    try {
        const refreshToken = tokenService.getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token found");

        const response = await axiosBase.post("/token/refresh/", { refresh: refreshToken });

        const { access, refresh } = response.data;
        tokenService.saveTokens(access, refresh, true);

        return access;
    } catch (error) {
        console.error("Failed to refresh token", error);
        tokenService.clearTokens();
        return null;
    }
};