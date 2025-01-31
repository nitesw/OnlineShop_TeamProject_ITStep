import {TokenPayload} from "../../models/accounts.ts";
import {tokenService} from "../../services/token.service.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {RootState} from "../store.ts";

interface AccountState {
    account: TokenPayload | null;
    isAuth: boolean;
}
const initialState: AccountState = {
    account: tokenService.getPayload(),
    isAuth: !!tokenService.getAccessToken(),
};

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        clear: (state) => {
            state.account = null;
            state.isAuth = false;
        },
        setAccount: (state, action: PayloadAction<TokenPayload>) => {
            state.account = action.payload;
            state.isAuth = true;
        },
    },
});

export const { clear, setAccount } = accountSlice.actions;

export const selectAccount = (state: RootState) => state.account.account;
export const selectIsAuth = (state: RootState) => state.account.isAuth;

export default accountSlice.reducer;