import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIDomain } from "../../utils/APIDomain";


export interface Tvehicles {
    vehicle_id: number;
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
        updateVehiclesTable: builder.mutation<Tvehicles, Partial<Tvehicles & { vehicle_id: number }>>({
            query: ({ vehicle_id, ...rest }) => ({
                url: `vehicles/${vehicle_id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['vehiclesTable'],
        }),
        deleteVehiclesTable: builder.mutation<{ success: boolean; vehicle_id: number }, number>({
            query: (vehicle_id) => ({
                url: `vehicles/${vehicle_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['vehiclesTable'],
        }),
    }),
});