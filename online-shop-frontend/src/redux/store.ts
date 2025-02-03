import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./account/accountSlice";
import authMiddleware from "./middlewares/authMiddleware.ts";
import {apiGenre} from "../services/api.genres.service.ts";
import {apiGame} from "../services/api.games.service.ts";
import { apiUser } from "../services/api.users.service.ts";
import {apiStats} from "../services/api.stats.service.ts";
// import spinnerSlice from "./spinner/spinnerSlice";

export const store = configureStore({
    reducer: {
        account: accountSlice,
        [apiGenre.reducerPath]: apiGenre.reducer,
        [apiGame.reducerPath]: apiGame.reducer,
        [apiUser.reducerPath]: apiUser.reducer,
        [apiStats.reducerPath]: apiStats.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiGenre.middleware, apiGame.middleware, apiUser.middleware, apiStats.middleware, authMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;