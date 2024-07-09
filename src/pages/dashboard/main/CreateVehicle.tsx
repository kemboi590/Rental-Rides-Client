import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { VehicleSpecificationsAPI } from "../../../features/vehicles/vehicleSpecs";
import { Toaster, toast } from 'sonner';
import CreateVehicleForm from "./createVehicle/CreateVehicle"

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
  const [createVehicleSpecifications, { error }] = VehicleSpecificationsAPI.useCreateVehicleSpecificationsMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("Submitting data:", data);
    try {
      const response = await createVehicleSpecifications(data);
      console.log("Response data:", response);
      toast.success("Vehicle specification created successfully");
    } catch (err) {
      console.error("API error:", error);
      toast.error("Failed to create vehicle specification");
    }
  };

  return (
    <div>
      <Toaster
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'text-green-400',
            warning: 'text-yellow-400',
            info: 'bg-blue-400',
          },
        }} />
      <div className="hero-content flex-col lg:flex-row-reverse lg:gap-16 h-full border-2 max-w-full">
        <div className="card bg-base-100 w-full shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body flex flex-row flex-wrap ">
            <div className="form-control ">
              <input type="text" placeholder="Manufacturer" className="input input-bordered " required {...register("manufacturer")} />
              <p className="text-red-500">{errors.manufacturer?.message}</p>
            </div>
            <div className="form-control">
              <input type="text" placeholder="Model" className="input input-bordered" required {...register("model")} />
              <p className="text-red-500">{errors.model?.message}</p>
            </div>
            <div className="form-control">
              <input type="number" placeholder="Year" className="input input-bordered" required {...register("year")} />
              <p className="text-red-500">{errors.year?.message}</p>
            </div>
            <div className="form-control">
              <input type="text" placeholder="Fuel Type" className="input input-bordered" required {...register("fuel_type")} />
              <p className="text-red-500">{errors.fuel_type?.message}</p>
            </div>
            <div className="form-control">
              <input type="text" placeholder="Engine Capacity" className="input input-bordered" required {...register("engine_capacity")} />
              <p className="text-red-500">{errors.engine_capacity?.message}</p>
            </div>
            <div className="form-control">
              <input type="text" placeholder="Transmission" className="input input-bordered" required {...register("transmission")} />
              <p className="text-red-500">{errors.transmission?.message}</p>
            </div>
            <div className="form-control">
              <input type="number" placeholder="Seating Capacity" className="input input-bordered" required {...register("seating_capacity")} />
              <p className="text-red-500">{errors.seating_capacity?.message}</p>
            </div>
            <div className="form-control">
              <input type="text" placeholder="Color" className="input input-bordered" required {...register("color")} />
              <p className="text-red-500">{errors.color?.message}</p>
            </div>
            <div className="form-control">
              <input type="text" placeholder="Features" className="input input-bordered" required {...register("features")} />
              <p className="text-red-500">{errors.features?.message}</p>
            </div>
            <div className="form-control mt-2 ">
              <button type="submit" className="btn bg-webcolor text-text-light hover:text-black border-none">Create Specification</button>
            </div>
          </form>
        </div>





      </div>
        <CreateVehicleForm/>
    </div>
  );
};

export default CreateVehicle;
