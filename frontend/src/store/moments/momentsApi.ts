import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {CsrfPayload, MyFormData} from "./dataTypes/registration";
import {IMoment, PaginationResponse, ResponseResult} from "../../models/models";

export const LIMIT = 10;
export const momentsApi = createApi({
    reducerPath: 'moments/api',
    tagTypes: ['moments'],
    baseQuery: fetchBaseQuery({
        // baseUrl: 'https://fakestoreapi.com/'
        baseUrl: 'http://localhost/',
        credentials: 'include'
        // prepareHeaders: (headers) => {
        //     headers.append("csrftoken", getCookie('csrftoken'))
        //     headers.set('Access-Control-Allow-Origin', '*')
        //     return headers
        // }
    }),
    endpoints: build => ({
        addMoment: build.mutation<any, FormData>({
            query: (payload:MyFormData) => ({
                url: 'api/v1/add_moment/',
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ['moments']
        }),
        signUp: build.mutation<any, FormData>({
            query: (payload:MyFormData) => ({
                url: 'api/v1/signup/',
                method: "POST",
                body: payload,
            }),
        }),
        like: build.mutation<any, number>({
            query: (moment_id:number) => ({
                url: `api/v1/moments/${moment_id}/like/`,
                method: "POST",
                body: CsrfPayload()
            }),
            invalidatesTags: ['moments']
        }),
        login: build.mutation<ResponseResult, FormData>({
            query: (payload:MyFormData) => ({
                    url: 'api/v1/login/',
                    method: "POST",
                    body: payload,
                }
            ),
            invalidatesTags: ['moments']
        }),
        logout: build.mutation<null, null>({
            query: () => ({
                    url: 'api/v1/logout/',
                    method: "POST",
                    body: CsrfPayload()
                }
            ),
            invalidatesTags: ['moments']
        }),
        getCsrf: build.query<any, any>({
            query: () => ({
                url: 'api/v1/get_csrf/',
                method: "GET"
            })
        }),
        moments: build.query<PaginationResponse<IMoment>, number>({
            query: (query:number) => ({
                url: 'api/v1/moments/',
                method: "GET",
                params: {
                    page: query
                },
            }),
            providesTags: ['moments']
            // transformResponse: (response : PaginationResponse<IMoment>) => response.results
        }),
        comments: build.query<any, number>( {
            query: (moment_id:number) => ({
                url: `api/v1/moments/${moment_id}/comments`,
                method: "GET"
            })
        })
    })
})

export const {useSignUpMutation, useLoginMutation, useLikeMutation, useLogoutMutation, useAddMomentMutation} = momentsApi
export const {useLazyGetCsrfQuery} = momentsApi
export const {useMomentsQuery} = momentsApi
export const {useCommentsQuery} = momentsApi