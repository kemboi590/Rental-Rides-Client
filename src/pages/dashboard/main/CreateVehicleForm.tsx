import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { vehiclesTableAPI } from "../../../features/vehicles/vehicleTable";
import { Toaster, toast } from 'sonner';
import { VehicleSpecificationsAPI } from "../../../features/vehicles/vehicleSpecs";

type FormData = {
    vehicleSpec_id: number;
    rental_rate: string;
    availability: boolean;
};

const schema = yup.object().shape({
    vehicleSpec_id: yup.number().required("Vehicle Spec is required"),
    rental_rate: yup.string().required("Rental Rate is required"),
    availability: yup.boolean().required("Availability is required"),
});

function CreateVehicleForm() {
    // Create vehicle
    const [createVehicle] = vehiclesTableAPI.useCreateVehiclesTableMutation();

    // Fetch vehicle specifications
    const { data: vehicleSpecs } = VehicleSpecificationsAPI.useGetVehicleSpecificationsQuery();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({ resolver: yupResolver(schema) });

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setIsLoading(true);
        console.log("Submitting data:", data);
        try {
            const response = await createVehicle(data).unwrap();
            console.log("Response data:", response);
            toast.success("Vehicle created successfully");
        } catch (err) {
            console.error("API error:", err);
            toast.error("Failed to create vehicle");
        } finally {
            setIsLoading(false);
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
            <div className="flex-col lg:flex-row-reverse lg:gap-16 h-full max-w-full">
                <div className="bg-base-100 w-full shadow-2xl">
                    <h2 className="text-center font-bold text-xl lg:text-2xl pt-4">Create Vehicle Specification</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body flex flex-row flex-wrap ">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Vehicle Specification</span>
                            </label>
                            <select className="select select-bordered bg-slate-200" {...register("vehicleSpec_id")}>
                                <option disabled selected>Select Vehicle </option>
                                {vehicleSpecs && vehicleSpecs.map(spec => (
                                    <option key={spec.vehicleSpec_id} value={spec.vehicleSpec_id}>
                                        {spec.manufacturer} - {spec.model}
                                    </option>
                                ))}
                            </select>
                            <p className="text-red-500">{errors.vehicleSpec_id?.message}</p>
                        </div>

                        <div className="form-control">
                            <label className="label ">
                                <span className="label-text">Rental Rate</span>
                            </label>
                            <input type="text" placeholder="Rental Rate" className="input input-bordered bg-slate-200" required {...register("rental_rate")} />
                            <p className="text-red-500">{errors.rental_rate?.message}</p>
                        </div>

                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text">Availability</span>
                            </label>
                            <select className="select select-bordered bg-slate-200" {...register("availability")}>
                                <option disabled selected>Availability</option>
                                <option value="true">Available</option>
                                <option value="false">Not Available</option>
                            </select>
                            <p className="text-red-500">{errors.availability?.message}</p>
                        </div>
                        <div className="mt-2 flex justify-center w-full">
                            <button type="submit" className="btn bg-webcolor text-text-light hover:text-black border-none" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <span className="loading loading-spinner text-text-light"></span>
                                        <span> Processing...</span>
                                    </>
                                ) : (
                                    "Create Vehicle"
                                )}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default CreateVehicleForm;
