import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIDomain } from "../../utils/APIDomain";

export interface TPayment {
  booking_id: number;
  amount: string;
  payment_status: string;
  payment_date: string;
  payment_method: string;
  transaction_id: string;
  created_at: string;
  updated_at: string;
}

export const paymentAPI = createApi({
  reducerPath: 'paymentAPI',
  baseQuery: fetchBaseQuery({ baseUrl: APIDomain }),
  tagTypes: ['payment'],
  endpoints: (builder) => ({
    getPayment: builder.query<TPayment[], void>({
      query: () => 'checkout-session',
      providesTags: ['payment'],
    }),
    createPayment: builder.mutation({
      query: (newPayment) => ({
        url: 'checkout-session',
        method: 'POST',
        body: newPayment,
      }),
      invalidatesTags: ['payment'],
    }),
    updatePayment: builder.mutation<TPayment, Partial<TPayment & { booking_id: number }>>({
      query: ({ booking_id, ...rest }) => ({
        url: `checkout-session/${booking_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['payment'],
    }),
    deletePayment: builder.mutation<{ success: boolean; booking_id: number }, number>({
      query: (booking_id) => ({
        url: `checkout-session/${booking_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['payment'],
    }),
    getBookingPayment: builder.query<TPayment, number>({
      query: (booking_id) => `checkout-session/booking/${booking_id}`,
    }),
    getPaymentByBookingId: builder.query<TPayment, number>({
      query: (booking_id) => `paymentbybooking/${booking_id}`,
    }),
  }),
});