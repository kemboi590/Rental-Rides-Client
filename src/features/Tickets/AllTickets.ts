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
                url: 'support',
                method: 'POST',
                body: newTicket,
            }),
            invalidatesTags: ['Ticket'],
        }),
        updateTicket: builder.mutation({
            query: ({ ticket_id, ...rest }) => ({
                url: `support/${ticket_id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['Ticket'],
        }),
        deleteTicket: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `support/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Ticket'],
        }),
        getTicketById: builder.query<TypeTicket, number>({
            query: (id) => `support/${id}`,
            providesTags: ['Ticket'],
        }),
        getUserTickets: builder.query<TypeTicket[], number>({
            query: (id) => `supportticket/user/${id}`,
            providesTags: ['Ticket'],
        }),

    }),
})