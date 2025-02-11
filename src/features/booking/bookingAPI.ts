import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIDomain } from "../../utils/APIDomain";


export interface Payment {
    amount: number;
    payment_date: string;
    payment_method: string;
    payment_status: string;
  }


  export interface Tbooking {
    booking_id: number;
    user_id: number;
    vehicle_id: number;
    location_id: number;
    booking_date: string;
    return_date: string;
    total_amount: string;
    booking_status: string;
    payments: Payment[];
  }


export const bookingVehicleAPI = createApi({
    reducerPath: 'bookingVehicleAPI',
    baseQuery: fetchBaseQuery({ baseUrl: APIDomain }),
    tagTypes: ['bookingVehicle'],
    endpoints: (builder) => ({
        getBookingVehicle: builder.query<Tbooking[], void>({
            query: () => 'bookings',
            providesTags: ['bookingVehicle'],
        }),
        createBookingVehicle: builder.mutation({
            query: (newBooking) => ({
                url: 'bookings',
                method: 'POST',
                body: newBooking,
            }),
            invalidatesTags: ['bookingVehicle'],
        }),
        updateBookingVehicle: builder.mutation<Tbooking, Partial<Tbooking & { user_id: number }>>({
            query: ({ user_id, ...rest }) => ({
                url: `bookings/${user_id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['bookingVehicle'],
        }),
        deleteBookingVehicle: builder.mutation<{ success: boolean; user_id: number }, number>({
            query: (user_id) => ({
                url: `bookings/${user_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['bookingVehicle'],
        }),
        getUserBooking: builder.query<Tbooking[], number>({
            query: (user_id) => `bookings/user/all/${user_id}`,
        }),
    }),
});

// export const { useGetBookingVehicleQuery, useCreateBookingVehicleMutation, useUpdateBookingVehicleMutation, useDeleteBookingVehicleMutation, useGetUserBookingQuery } = bookingVehicleAPI;