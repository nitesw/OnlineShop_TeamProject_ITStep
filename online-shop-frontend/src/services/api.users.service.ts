import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {APP_ENV} from "../env";
import {LoginModel, RegisterModel, UserModel} from "../models/accounts.ts";

export const apiUser = createApi({
    reducerPath: "user",
    baseQuery: fetchBaseQuery({ baseUrl: `${APP_ENV.REMOTE_BASE_URL}/api` }),
    endpoints: (builder) => ({
        userLogin: builder.mutation({
            query: (data: LoginModel) => ({
                url: "/login/",
                method: "POST",
                body: data
            })
        }),
        userRegister: builder.mutation({
            query: (data: RegisterModel) => ({
                url: "/register/",
                method: "POST",
                body: data
            })
        }),
        userLogout: builder.mutation<void, { refresh_token: string, access_token: string }>({
            query: (data) => {
                const { refresh_token, access_token } = data;
                return {
                    url: "/logout/",
                    method: "POST",
                    body: { refresh_token },
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                };
            }
        }),
        getUser: builder.query<UserModel, number>({
            query: (id) => `/users/${id}/`
        })
    })
})

export const { useUserLoginMutation, useGetUserQuery, useUserLogoutMutation, useUserRegisterMutation } = apiUser;