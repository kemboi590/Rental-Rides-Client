import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { VehicleSpecificationsAPI } from "../../../../features/vehicles/vehicleSpecs";
import { Toaster, toast } from 'sonner';
import axios from 'axios';

type FormData = {
  manufacturer: string;
  model: string;
  year: number;
  fuel_type: string;
  engine_capacity: string;
  transmission: string;
  seating_capacity: number;
  color: string;
  features: string;
  image_url?: string;
};

const schema = yup.object().shape({
  manufacturer: yup.string().required("Manufacturer is required"),
  model: yup.string().required("Model is required"),
  year: yup.number().min(2000, "Should be at least 2000").max(2024, "Should be at most 2024").required("Year is required"),
  fuel_type: yup.string().required("Fuel type is required"),
  engine_capacity: yup.string().required("Engine capacity is required"),
  transmission: yup.string().required("Transmission is required"),
  seating_capacity: yup.number().min(1, "Seating capacity must be at least 1").required("Seating capacity is required"),
  color: yup.string().required("Color is required"),
  features: yup.string().required("Features are required")
});

const CreateVehicle = () => {
  const [models, setModels] = useState<string[]>(["Corolla", "Camry", "Rav4"]);
  const [manufacturerOptions] = useState<string[]>(["Toyota", "Honda", "Mercedes-Benz", "Tesla"]);
  const [fuelTypeOptions] = useState<string[]>(["Gasoline", "Diesel", "Electric", "Hybrid"]);
  const [image, setImage] = useState<File | null>(null);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({ resolver: yupResolver(schema) });

  const [createVehicleSpecifications] = VehicleSpecificationsAPI.useCreateVehicleSpecificationsMutation();
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    console.log("Submitting data:", data);
    try {
      let imageUrl = '';
      if (image) {
        const formData = new FormData();
        formData.append('file', image); //jw44anbu
        formData.append('upload_preset', 'upload'); // Replace with your Cloudinary upload preset

        const response = await axios.post('https://api.cloudinary.com/v1_1/dl3ovuqjn/image/upload', formData);

        if (response.status === 200) {
          imageUrl = response.data.secure_url;
        } else {
          throw new Error('Failed to upload image');
        }
      }

      const submissionData = { ...data, image_url: imageUrl };

      const response = await createVehicleSpecifications(submissionData).unwrap();
      console.log("Response data:", response);
      toast.success("Vehicle specification created successfully");
    } catch (err) {
      console.error("API error:", err);
      toast.error("Failed to create vehicle specification");
    } finally {
      setIsLoading(false);
    }
  };

  const years = Array.from({ length: 25 }, (_, i) => 2000 + i);

  const handleManufacturerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedManufacturer = event.target.value;
    switch (selectedManufacturer) {
      case "Toyota":
        setModels(["Corolla", "Camry", "Rav4"]);
        break;
      case "Honda":
        setModels(["Civic", "Accord", "CR-V"]);
        break;
      case "Mercedes-Benz":
        setModels(["C-Class", "E-Class", "S-Class"]);
        break;
      case "Tesla":
        setModels(["Model S", "Model 3", "Model X"]);
        break;
      default:
        setModels([]);
        break;
    }
    setValue("model", "");
  };

  return (
    <div className="">
      <Toaster
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'text-green-400',
            warning: 'text-yellow-400',
            info: 'bg-blue-400',
          },
        }}
      />

      <div className="bg-base-200 w-full">
        <h2 className="text-center font-bold text-xl lg:text-2xl pt-4">Create Vehicle Specification</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="form-control">
              <select className="select select-bordered bg-slate-200" {...register("manufacturer", { required: true })} onChange={handleManufacturerChange}>
                <option disabled value="">Select Manufacturer</option>
                {manufacturerOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
              <p className="text-red-500">{errors.manufacturer?.message}</p>
            </div>

            <div className="form-control">
              <select className="select select-bordered bg-slate-200" {...register("model", { required: true })}>
                <option disabled value="">Select Model</option>
                {models.map((modelOption, index) => (
                  <option key={index} value={modelOption}>{modelOption}</option>
                ))}
              </select>
              <p className="text-red-500">{errors.model?.message}</p>
            </div>

            <div className="form-control">
              <select className="select select-bordered bg-slate-200" {...register("year", { required: true })}>
                <option disabled value="">Select Year</option>
                {years.map((year, index) => (
                  <option key={index} value={year}>{year}</option>
                ))}
              </select>
              <p className="text-red-500">{errors.year?.message}</p>
            </div>

            <div className="form-control">
              <select className="select select-bordered bg-slate-200" {...register("fuel_type", { required: true })}>
                <option disabled value="">Select Fuel Type</option>
                {fuelTypeOptions.map((fuelType, index) => (
                  <option key={index} value={fuelType}>{fuelType}</option>
                ))}
              </select>
              <p className="text-red-500">{errors.fuel_type?.message}</p>
            </div>

            <div className="form-control ">
              <input type="text" placeholder="Engine Capacity" className="input input-bordered bg-slate-200" {...register("engine_capacity", { required: true })} />
              <p className="text-red-500">{errors.engine_capacity?.message}</p>
            </div>

            <div className="form-control">
              <label className="form-control">
                <select className="select select-bordered bg-slate-200" {...register("transmission")}>
                  <option disabled selected>Transmission</option>
                  <option>Automatic</option>
                  <option>Manual</option>
                </select>
              </label>
              <p className="text-red-500">{errors.transmission?.message}</p>
            </div>

            <div className="form-control">
              <input type="number" placeholder="Seating Capacity" className="input input-bordered bg-slate-200" {...register("seating_capacity", { required: true })} />
              <p className="text-red-500">{errors.seating_capacity?.message}</p>
            </div>
            <div className="form-control">
              <input type="text" placeholder="Color" className="input input-bordered bg-slate-200" {...register("color", { required: true })} />
              <p className="text-red-500">{errors.color?.message}</p>
            </div>
            <div className="form-control">
              <input type="text" placeholder="Features" className="input input-bordered bg-slate-200" {...register("features", { required: true })} />
              <p className="text-red-500">{errors.features?.message}</p>
            </div>

            {/* Imag e upload input */}
            <div className="form-control">
              <input type="file" className="input input-bordered bg-slate-200" accept="image/*" name="vehicle_image" onChange={handleImageUpload} />
            </div>
          </div>

          <div className="mt-2 flex justify-center">
            <button type="submit" className={`btn btn-primary ${isLoading ? "loading" : ""}`} disabled={isLoading}>
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateVehicle;
