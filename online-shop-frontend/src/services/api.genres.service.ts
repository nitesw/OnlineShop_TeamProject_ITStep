import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {APP_ENV} from "../env";
import { IGenre } from "../models/types";

export const apiGenre = createApi({
    reducerPath: "genre",
    baseQuery: fetchBaseQuery({ baseUrl: `${APP_ENV.REMOTE_BASE_URL}/api` }),
    endpoints: (builder) => ({
        getGenres: builder.query<IGenre[], void>({
            query: () => '/genres/'
        })
    })
})

export const { useGetGenresQuery } = apiGenre;