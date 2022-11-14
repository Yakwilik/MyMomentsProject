import {configureStore} from "@reduxjs/toolkit";
import {momentsApi} from "./moments/momentsApi";




export const store = configureStore({
    reducer:{
        [momentsApi.reducerPath]: momentsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            momentsApi.middleware,
        ),
})