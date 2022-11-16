import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {MyFormData, RegistrationData} from "./dataTypes/registration";

export const momentsApi = createApi({
    reducerPath: 'moments/api',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'https://fakestoreapi.com/'
        baseUrl: 'http://localhost:8080/'
    }),
    endpoints: build => ({
        signUp: build.mutation<any, FormData>({
            query: (payload:MyFormData) => ({
                url: 'api/v1/signup/',
                method: "POST",
                body: payload,
            }),
        })
    })
})

export const {useSignUpMutation} = momentsApi