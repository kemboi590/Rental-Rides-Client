import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TLogin {
    email: string;
    password: string;
}

export const loginAPI = createApi({
    reducerPath: 'loginAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
    tagTypes: ['Login'], 
    endpoints: (builder) => ({
        loginUser: builder.mutation<TLogin, TLogin>({
            query: (user) => ({
                url: 'login',
                method: 'POST',
                body: user,
            }),
        }),
        // logout
        
    }),
});

// export const useLoginUserMutation: typeof loginAPI.useLoginUserMutation = loginAPI.useLoginUserMutation;

// Explicit type exports
// export type UseLoginUserMutation = typeof useLoginUserMutation;