import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import  { APIDomain } from './../../utils/APIDomain';

export interface TypeTicket{
    ticket_id: number;
    user_id: number;
    subject: string;
    description: string;
    status: string;
}

// API Slice
export const TicketAPI = createApi({
    reducerPath: 'TicketAPI',
    baseQuery: fetchBaseQuery({ baseUrl: APIDomain }),
    refetchOnReconnect: true,
    tagTypes: ['Ticket'],
    endpoints: (builder) => ({
        getTickets: builder.query<TypeTicket[], void>({
            query: () => 'supporttickets/users/all',
            providesTags: ['Ticket'],
        }),
        createTicket: builder.mutation<TypeTicket, Partial<TypeTicket>>({
            query: (newTicket) => ({
                url: 'supporttickets/users/all',
                method: 'POST',
                body: newTicket,
            }),
            invalidatesTags: ['Ticket'],
        }),
        updateTicket: builder.mutation<TypeTicket, Partial<TypeTicket & { id: number }>>({
            query: ({ id, ...rest }) => ({
                url: `supporttickets/users/all/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['Ticket'],
        }),
        deleteTicket: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `supporttickets/users/all/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Ticket'],
        }),
        getTicketById: builder.query<TypeTicket, number>({
            query: (id) => `supporttickets/users/all/${id}`,
            providesTags: ['Ticket'],
        }),
        getUserTickets: builder.query<TypeTicket[], number>({
            query: (id) => `supportticket/user/${id}`,
            providesTags: ['Ticket'],
        }),

    }),
})