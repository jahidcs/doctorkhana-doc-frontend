import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userAuthApi = createApi({
    reducerPath: 'userAuthApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/doctor/' }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (doctor) => {
                return {
                    url: 'register/',
                    method: 'POST',
                    body: doctor,
                    headers: {
                        'Content-type': 'application/json',
                    },
                }
            },
        }),

        loginUser: builder.mutation({
            query: (doctor) => {
                return {
                    url: 'login/',
                    method: 'POST',
                    body: doctor,
                    headers: {
                        'Content-type': 'application/json',
                    },
                }
            },
        }),

        userProfile: builder.query({
            query: (access_token) => {
                return {
                    url: 'profile/',
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${access_token}`,
                    },
                }
            },
        }),
    }),
})

export const { useRegisterUserMutation, useLoginUserMutation, useUserProfileQuery } = userAuthApi
