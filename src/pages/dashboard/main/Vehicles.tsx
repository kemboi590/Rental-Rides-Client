import { Link } from 'react-router-dom';
import { vehiclesAPI } from "../../../features/vehicles/Vehicles";
import { VehicleDataTypes } from '../../../features/vehicles/Vehicles';
import Loader from '../../Loader';

function Vehicles() {
  const { data: vehicleData = [], isLoading, isError } = vehiclesAPI.useFetchCarSpecsQuery(undefined, {
    pollingInterval: 6000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true
  });

  console.log(vehicleData);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading vehicles data.</div>;
  }

  if (vehicleData.length === 0) {
    return <div>No vehicles available</div>;
  }

  return (
    <div className="overflow-x-auto text-base-content rounded-lg p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {vehicleData.map((vehicle: VehicleDataTypes) => (
          <div key={vehicle.vehicle_id} className="card bg-base-100 shadow-xl h-full">
            <figure className='h-[35%]'>
              <img src={vehicle.vehicle_specifications.image_url} alt="image for the car" className='w-full' />
            </figure>
            <div className="card-body px-2">
              <div className="flex justify-between">
                <h3 className="card-title">{vehicle.vehicle_specifications.manufacturer} {vehicle.vehicle_specifications.model}</h3>
                <div className={`badge ${vehicle.availability ? 'badge-success' : 'badge-error'} text-base py-3`}>
                  {vehicle.availability ? 'Available' : 'Unavailable'}
                </div>
              </div>
              <div className="text-lg m-2">
                <p><strong>Fuel Type</strong>: {vehicle.vehicle_specifications.fuel_type}</p>
                <p><strong>Engine Capacity</strong>: {vehicle.vehicle_specifications.engine_capacity}</p>
                <p><strong>Color</strong>: {vehicle.vehicle_specifications.color}</p>
                <p><strong>Rental Rate</strong>: {vehicle.rental_rate}</p>
              </div>
              <div className="flex justify-center items-center">
                <Link to={`booking/${vehicle.vehicle_id}`}>
                  <button className="btn bg-webcolor text-text-light hover:text-black border-none">View Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vehicles;
