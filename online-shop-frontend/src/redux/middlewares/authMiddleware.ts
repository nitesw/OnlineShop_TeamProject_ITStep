import { Middleware } from "@reduxjs/toolkit";
import { tokenService } from "../../services/token.service";
import { authService } from "../../services/auth.service";
import { setAccount, clear } from "../account/accountSlice";
import { useNavigate } from "react-router-dom";

let isRefreshing = false;

const authMiddleware: Middleware = (store) => (next) => async (action) => {
    const accessToken = tokenService.getAccessToken();
    const payload = tokenService.getPayload();

    if (accessToken && payload) {
        const isTokenExpired = payload.exp * 1000 < Date.now();

        if (isTokenExpired && !isRefreshing) {
            isRefreshing = true;

            try {
                const newAccessToken = await authService();
                if (newAccessToken) {
                    const updatedPayload = tokenService.getPayload();
                    store.dispatch(setAccount(updatedPayload!));
                } else {
                    store.dispatch(clear());
                    // TODO: use pop up to say that user needs to re-login
                    const navigate = useNavigate();
                    navigate("/login");
                }
            } catch (error) {
                console.error("Failed to refresh token", error);
                store.dispatch(clear());
                const navigate = useNavigate();
                navigate("/login");
            } finally {
                isRefreshing = false;
            }
        }
    }

    return next(action);
};

export default authMiddleware;