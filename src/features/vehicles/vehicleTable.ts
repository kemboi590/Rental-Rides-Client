import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIDomain } from "../../utils/APIDomain";


export interface Tvehicles {
    vehicleSpec_id: number;
    rental_rate: string;
    availability: boolean;
}

export const vehiclesTableAPI = createApi({
    reducerPath: 'vehiclesTableAPI',
    baseQuery: fetchBaseQuery({ baseUrl: APIDomain }),
    tagTypes: ['vehiclesTable'],
    endpoints: (builder) => ({
        getVehiclesTable: builder.query<Tvehicles[], void>({
            query: () => 'vehicles',
            providesTags: ['vehiclesTable'],
        }),
        createVehiclesTable: builder.mutation<Tvehicles, Partial<Tvehicles>>({
            query: (newVehicle) => ({
                url: 'vehicles',
                method: 'POST',
                body: newVehicle,
            }),
            invalidatesTags: ['vehiclesTable'],
        }),
        updateVehiclesTable: builder.mutation<Tvehicles, Partial<Tvehicles & { vehicleSpec_id: number }>>({
            query: ({ vehicleSpec_id, ...rest }) => ({
                url: `vehicles/${vehicleSpec_id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['vehiclesTable'],
        }),
        deleteVehiclesTable: builder.mutation<{ success: boolean; vehicleSpec_id: number }, number>({
            query: (vehicleSpec_id) => ({
                url: `vehicles/${vehicleSpec_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['vehiclesTable'],
        }),
    }),
});