import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIDomain } from "../../utils/APIDomain";
export interface VehicleSpecifications {
  manufacturer: string;
  model: string;
  year: number;
  fuel_type: string;
  color: string;
  engine_capacity: string;
  transmission: string;
  features: string;
  seating_capacity: number;
}

export interface VehicleDataTypes {
  vehicle_id: number;
  rental_rate: string;
  availability: boolean;
  vehicle_specifications: VehicleSpecifications;
}

// API Slice
export const vehiclesAPI = createApi({
  reducerPath: 'vehiclesAPI',
  baseQuery: fetchBaseQuery({ baseUrl: APIDomain }),
  tagTypes: ['Vehicles'],
  endpoints: (builder) => ({
    getVehicles: builder.query<VehicleDataTypes[], void>({
      query: () => 'vehiclesSpecs',
      providesTags: ['Vehicles'],
    }),
    createVehicle: builder.mutation<VehicleDataTypes, Partial<VehicleDataTypes>>({
      query: (newVehicle) => ({
        url: 'vehicles',
        method: 'POST',
        body: newVehicle,
      }),
      invalidatesTags: ['Vehicles'],
    }),
    updateVehicle: builder.mutation<VehicleDataTypes, Partial<VehicleDataTypes & { vehicle_id: number }>>({
      query: ({ vehicle_id, ...rest }) => ({
        url: `vehicles/${vehicle_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Vehicles'],
    }),
    deleteVehicle: builder.mutation<{ success: boolean; vehicle_id: number }, number>({
      query: (vehicle_id) => ({
        url: `vehicles/${vehicle_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Vehicles'],
    }),
    getVehicleById: builder.query<VehicleDataTypes, number>({
      query: (vehicle_id) => `vehicle-specs/${vehicle_id}`,
      providesTags: ['Vehicles'],
  }),
  }),
});
