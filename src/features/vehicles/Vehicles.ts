import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
  tagTypes: ['Vehicles'],
  endpoints: (builder) => ({
    getVehicles: builder.query<VehicleDataTypes[], void>({
      query: () => 'vehiclesSpecs',
      providesTags: ['Vehicles'],
    })
  }),
});
