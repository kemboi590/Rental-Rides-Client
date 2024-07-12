import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { bookingVehicleAPI } from "../../../../features/booking/bookingAPI";
import { vehiclesAPI } from "../../../../features/vehicles/Vehicles";
import { Toaster, toast } from 'sonner';
import imageForAllCards from "../../../../assets/images/landingPage/Mazda.jpeg";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";

type BookingFormData = {
  booking_date: Date;
  return_date: Date;
  booking_status: string;
};

const schema = yup.object().shape({
  booking_date: yup.date().required("Booking date is required"),
  return_date: yup.date().required("Return date is required"),
  booking_status: yup.string().required("Booking status is required"),
});

const BookingForm = () => {
  const user = useSelector((state: RootState) => state.user);
  const { vehicle_id } = useParams<{ vehicle_id: string }>();
  const parsedVehicleId = vehicle_id ? parseInt(vehicle_id, 10) : NaN;

  if (isNaN(parsedVehicleId)) {
    console.error("Invalid vehicle ID");
    return <div>Invalid vehicle ID</div>;
  }

  const { data: vehicleData, isLoading, error: vehicleError } = vehiclesAPI.useGetVehicleByIdQuery(parsedVehicleId);
  const [bookingVehicle,] = bookingVehicleAPI.useCreateBookingVehicleMutation();

  const externalData = {
    user_id: user.user?.userID,
    vehicle_id: parsedVehicleId,
    total_amount: vehicleData?.rental_rate
  };

  const { register, handleSubmit, formState: { errors } } = useForm<BookingFormData>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<BookingFormData> = async (formData) => {
    const dataToSubmit = {
      ...externalData,
      ...formData
    };

    try {
      const response = await bookingVehicle(dataToSubmit);
      console.log("Booking created successfully", response);
      toast.success("Booking created successfully");
    } catch (err) {
      console.error("Error creating booking", err);
      toast.error("Error creating booking");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (vehicleError) return <div>Error loading vehicle data</div>;

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
        }}
      />

      <h1 className="text-xl font-bold mb-4 text-webcolor text-center p-5">Vehicle Details</h1>

      <div className="card rounded-lg p-4 lg:w-3/4 m-auto">
        {!isLoading && !vehicleError && vehicleData && (
          <div className="card shadow-xl lg:gap-10 border-2 lg:flex-row justify-center items-center bg-gray-100 ">
            <figure className="w-[50%] lg:w-[35%] p-3 ">
              <img src={imageForAllCards} alt="cardetails" className="rounded-lg" />
            </figure>

            <div className="card-body justify-center items-center text-justify space-y-4 p-6  rounded-lg">
              <h3 className="card-title text-2xl font-semibold">
                {vehicleData.vehicle_specifications.manufacturer} {vehicleData.vehicle_specifications.model}
                <span className={`ml-4 badge ${vehicleData.availability ? 'badge-success' : 'badge-error'}`}>
                  {vehicleData.availability ? 'Available' : 'Unavailable'}
                </span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <p className="text-lg"><strong>Fuel Type:</strong> {vehicleData.vehicle_specifications.fuel_type}</p>
                <p className="text-lg"><strong>Engine Capacity:</strong> {vehicleData.vehicle_specifications.engine_capacity}</p>
                <p className="text-lg"><strong>Color:</strong> {vehicleData.vehicle_specifications.color}</p>
                <p className="text-lg"><strong>Rental Rate:</strong> {vehicleData.rental_rate}</p>
                <p className="text-lg"><strong>Seating Capacity:</strong> {vehicleData.vehicle_specifications.seating_capacity}</p>
                <p className="text-lg"><strong>Transmission:</strong> {vehicleData.vehicle_specifications.transmission}</p>
                <p className="text-base col-span-1 sm:col-span-2"><strong>Features:</strong> {vehicleData.vehicle_specifications.features}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <h1 className="text-xl font-bold mb-4 text-webcolor text-center p-5">Booking Vehicle</h1>
      <div className="p-5 rounded-lg shadow-lg card lg:w-3/4 border-2 m-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col lg:flex-row space-x-4 w-full">
            <div className="form-control lg:w-1/2">
              <label htmlFor="booking_date" className="label">Booking Date</label>
              <input type="date" id="booking_date" className="input input-bordered" {...register("booking_date")} />
              <p className="text-red-500">{errors.booking_date?.message}</p>
            </div>
            <div className="form-control lg:w-1/2">
              <label htmlFor="return_date" className="label">Return Date</label>
              <input type="date" id="return_date" className="input input-bordered" {...register("return_date")} />
              <p className="text-red-500">{errors.return_date?.message}</p>
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="booking_status" className="label">Booking Status</label>
            <select id="booking_status" className="select select-bordered" {...register("booking_status")}>
              <option disabled value="">Select Booking Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <p className="text-red-500">{errors.booking_status?.message}</p>
          </div>
          <div className="form-control mt-4">
            <button type="submit" className="btn bg-webcolor text-text-light hover:text-black border-none">Create Booking</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
