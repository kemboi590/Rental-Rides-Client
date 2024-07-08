import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../users/userSlice";


export interface TLoginResponse {
    token: string;
    user: User;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export const loginAPI = createApi({
    reducerPath: 'loginAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
    tagTypes: ['Login'], 
    endpoints: (builder) => ({
        loginUser: builder.mutation<TLoginResponse, LoginFormData>({
            query: (user) => ({
                url: 'login',
                method: 'POST',
                body: user,
            }),
        }),
        // logout
        
    }),
});