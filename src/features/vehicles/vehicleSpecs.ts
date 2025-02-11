import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIDomain } from "../../utils/APIDomain";

export interface VSpecifications {
    vehicleSpec_id: number;
    manufacturer: string;
    model: string;
    year: number;
    fuel_type: string;
    color: string;
    engine_capacity: string;
    transmission: string;
    features: string;
    seating_capacity: number;
    image_url: string;
}


// API Slice
export const VehicleSpecificationsAPI  = createApi({
    reducerPath: 'VehicleSpecificationsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: APIDomain }),
    refetchOnReconnect: true,
    tagTypes: ['VehicleSpecifications'],
    endpoints: (builder) => ({
        getVehicleSpecifications: builder.query<VSpecifications[], void>({
        query: () => 'vehicleSpecifications',
        providesTags: ['VehicleSpecifications'],
        }),
        createVehicleSpecifications: builder.mutation<VSpecifications, Partial<VSpecifications>>({
        query: (newVehicleSpecifications) => ({
            url: 'vehicleSpecifications',
            method: 'POST',
            body: newVehicleSpecifications,
        }),
        invalidatesTags: ['VehicleSpecifications'],
        }),
        updateVehicleSpecifications: builder.mutation<VSpecifications, Partial<VSpecifications & { id: number }>>({
        query: ({ id, ...rest }) => ({
            url: `vehicleSpecifications/${id}`,
            method: 'PUT',
            body: rest,
        }),
        invalidatesTags: ['VehicleSpecifications'],
        }),
        deleteVehicleSpecifications: builder.mutation<{ success: boolean; id: number }, number>({
        query: (id) => ({
            url: `vehicleSpecifications/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['VehicleSpecifications'],
        }),
        getVehicleSpecificationById: builder.query<VSpecifications, number>({
        query: (id) => `vehicleSpecifications/${id}`,
        providesTags: ['VehicleSpecifications'],
        }),
    }),
})