import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const momentsApi = createApi({
    reducerPath: 'moments/api',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'https://fakestoreapi.com/'
        baseUrl: 'http://localhost:8080/'
    }),
    endpoints: build => ({
        signUp: build.query<any, string>({
            query: (search:string) => ({
                url: 'api/v1/signup',
                params: {
                    login: search,
                    password: search
                },

            }),
        })
    })
})

export const {useSignUpQuery} = momentsApi