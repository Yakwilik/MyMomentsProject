import {configureStore} from "@reduxjs/toolkit";
import {momentsApi} from "./moments/momentsApi";
import {authReducers} from "./moments/moments.slice";




export const store = configureStore({
    reducer:{
        [momentsApi.reducerPath]: momentsApi.reducer,
        auth: authReducers
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            momentsApi.middleware,
        ),
})

export type RootState = ReturnType<typeof store.getState>