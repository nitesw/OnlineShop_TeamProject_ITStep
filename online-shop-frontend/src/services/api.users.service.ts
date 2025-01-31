import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {APP_ENV} from "../env";
import {ILogin} from "../models/types";

export const apiUser = createApi({
    reducerPath: "user",
    baseQuery: fetchBaseQuery({ baseUrl: `${APP_ENV.REMOTE_BASE_URL}/api` }),
    endpoints: (builder) => ({
        userLogin: builder.mutation({
            query: (data: ILogin) => ({
                url: "/login/",
                method: "POST",
                body: data
            })
        })
    })
})

export const { useUserLoginMutation } = apiUser;