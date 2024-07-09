import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { vehiclesTableAPI } from "../../../../features/vehicles/vehicleTable";
import { Toaster, toast } from 'sonner';

type FormData = {
    vehicleSpec_id: number;
    rental_rate: string;
    availability: boolean;
};

const schema = yup.object().shape({
    vehicleSpec_id: yup.number().required("Vehicle Spec ID is required"),
    rental_rate: yup.string().required("Rental Rate is required"),
    availability: yup.boolean().required("Availability is required"),
});


function CreateVehicleForm() {
    const [createVehicle, { error: vehicleError }] = vehiclesTableAPI.useCreateVehiclesTableMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({ resolver: yupResolver(schema) });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log("Submitting data:", data);
        try {
            const response = await createVehicle(data);
            console.log("Response data:", response);
            toast.success("Vehicle created successfully");
        } catch (err) {
            console.error("API error:", vehicleError);
            toast.error("Failed to create vehicle");
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
                        <div className="form-control">
                            <input type="number" placeholder="Vehicle Spec ID" className="input input-bordered" required {...register("vehicleSpec_id")} />
                            <p className="text-red-500">{errors.vehicleSpec_id?.message}</p>
                        </div>
                        <div className="form-control">
                            <input type="text" placeholder="Rental Rate" className="input input-bordered" required {...register("rental_rate")} />
                            <p className="text-red-500">{errors.rental_rate?.message}</p>
                        </div>
                        <div className="form-control">
                            <input type="text" placeholder="Availability" className="input input-bordered" required {...register("availability")} />
                            <p className="text-red-500">{errors.availability?.message}</p>
                        </div>
                        <div className="form-control mt-2">
                            <button type="submit" className="btn bg-webcolor text-text-light hover:text-black border-none">Create Vehicle</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateVehicleForm