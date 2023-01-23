import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {MyFormData, RegistrationData} from "./dataTypes/registration";
import {IMoment, PaginationResponse} from "../../models/models";
import exp from "constants";


export const momentsApi = createApi({
    reducerPath: 'moments/api',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'https://fakestoreapi.com/'
        baseUrl: 'http://localhost/'
    }),
    endpoints: build => ({
        signUp: build.mutation<any, FormData>({
            query: (payload:MyFormData) => ({
                url: 'api/v1/signup/',
                method: "POST",
                body: payload,
            }),
        }),
        moments: build.query<IMoment[], string>({
            query: (query:string) => ({
                url: 'api/v1/moments/',
                method: "GET",
                params: {
                    limit: 10
                }
            }),
            transformResponse: (response : PaginationResponse<IMoment>) => response.results
        }),
        comments: build.query<any, number>( {
            query: (moment_id:number) => ({
                url: `api/v1/moments/${moment_id}/comments`,
                method: "GET"
            })
        })
    })
})

export const {useSignUpMutation} = momentsApi
export const {useMomentsQuery} = momentsApi
export const {useCommentsQuery} = momentsApi