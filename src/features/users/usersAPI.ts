import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TUser {
    id: number;
    full_name: string;
    email: string;
    contact_phone: string;
    address: string;
    password: string;
}

// API Slice
export const usersAPI = createApi({
    reducerPath: 'usersAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getUsers: builder.query<TUser[], void>({
            query: () => 'users',
            providesTags: ['Users'],
        }),
        createUser: builder.mutation<TUser, Partial<TUser>>({
            query: (newUser) => ({
                url: 'users',
                method: 'POST',
                body: newUser,
            }),
            invalidatesTags: ['Users'],
        }),
        updateUser: builder.mutation<TUser, Partial<TUser & { id: number }>>({
            query: ({ id, ...rest }) => ({
                url: `users/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['Users'],
        }),
        deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users'],
        }),
    }),
});

export const useGetUsersQuery: typeof usersAPI.useGetUsersQuery = usersAPI.useGetUsersQuery;
export const useCreateUserMutation: typeof usersAPI.useCreateUserMutation = usersAPI.useCreateUserMutation;
export const useUpdateUserMutation: typeof usersAPI.useUpdateUserMutation = usersAPI.useUpdateUserMutation;
export const useDeleteUserMutation: typeof usersAPI.useDeleteUserMutation = usersAPI.useDeleteUserMutation;

// // Explicit type exports
// export type UseGetUsersQuery = typeof useGetUsersQuery;
// export type UseCreateUserMutation = typeof useCreateUserMutation;
// export type UseUpdateUserMutation = typeof useUpdateUserMutation;
// export type UseDeleteUserMutation = typeof useDeleteUserMutation;
