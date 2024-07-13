import { Link } from 'react-router-dom';
import imageForAllCards from "../../../assets/images/landingPage/Mazda.jpeg";
import { vehiclesAPI } from "../../../features/vehicles/Vehicles";

function Vehicles() {
  const page = void 0;
  const { data: vehicleData, isLoading } = vehiclesAPI.useGetVehiclesQuery(page, {
    pollingInterval: 6000, refetchOnMountOrArgChange: true
  });

  return (
    <div className="overflow-x-auto text-base-content rounded-lg p-4">
      {isLoading && <div>Loading...</div>}
      {vehicleData && vehicleData.length === 0 && <div>No Data</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {vehicleData && vehicleData.map((vehicle) => (
          <div key={vehicle.vehicle_id} className="card bg-base-100 shadow-xl h-full">
            <figure className='h-[35%]'>
              <img src={imageForAllCards} alt="image for the car" className='w-full' />
            </figure>
            <div className="card-body px-2">

              <div className="flex justify-between">
                <h3 className="card-title">{vehicle.vehicle_specifications.manufacturer} {vehicle.vehicle_specifications.model}</h3>

                <div className={`badge ${vehicle.availability ? 'badge-success' : 'badge-error'} text-base py-3`} >
                  {vehicle.availability ? 'Available' : 'Unavailable'}
                </div>
              </div>

              <div className="text-lg m-2">
                <p><strong>Fuel Type</strong>: {vehicle.vehicle_specifications.fuel_type}</p>
                <p> <strong>Engine Capacity</strong>: {vehicle.vehicle_specifications.engine_capacity}</p>
                <p><strong>Color</strong>: {vehicle.vehicle_specifications.color}</p>
                <p><strong>Rental Rate</strong>: {vehicle.rental_rate}</p>
              </div>

              <div className="flex justify-center items-center">
                <Link to={`booking/${vehicle.vehicle_id}`}>
                  <button className="btn bg-webcolor text-text-light hover:text-black border-none">Book Now</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Vehicles;
