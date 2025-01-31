import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./account/accountSlice";
import authMiddleware from "./middlewares/authMiddleware.ts";
import {apiGenre} from "../services/api.genres.service.ts";
// import spinnerSlice from "./spinner/spinnerSlice";

export const store = configureStore({
    reducer: {
        account: accountSlice,
        [apiGenre.reducerPath]: apiGenre.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiGenre.middleware, authMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;