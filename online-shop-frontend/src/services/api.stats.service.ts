import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {APP_ENV} from "../env";
import {StatsResponse} from "../models/stats.ts";

export const apiStats = createApi({
    reducerPath: "stats",
    baseQuery: fetchBaseQuery({ baseUrl: `${APP_ENV.REMOTE_BASE_URL}/api` }),
    endpoints: (builder) => ({
        getStats: builder.query<StatsResponse, void>({
            query: () => '/stats/'
        })
    })
})

export const { useGetStatsQuery } = apiStats;