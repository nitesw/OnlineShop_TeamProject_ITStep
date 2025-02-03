import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {APP_ENV} from "../env";
import {GameModel} from "../models/games.ts";

export const apiGame = createApi({
    reducerPath: "game",
    baseQuery: fetchBaseQuery({ baseUrl: `${APP_ENV.REMOTE_BASE_URL}/api` }),
    endpoints: (builder) => ({
        getGames: builder.query<GameModel[], void>({
            query: () => '/games/'
        })
    })
})

export const { useGetGamesQuery } = apiGame;