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
          <div key={vehicle.vehicle_id} className="card bg-base-100 shadow-xl">
            <figure>
              <img src={imageForAllCards} alt={`${vehicle.vehicle_specifications?.manufacturer} ${vehicle.vehicle_specifications.model}`} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {vehicle.vehicle_specifications.manufacturer} {vehicle.vehicle_specifications.model}
              </h2>
              <p>Fuel Type: {vehicle.vehicle_specifications.fuel_type}</p>
              <p>Engine Capacity: {vehicle.vehicle_specifications.engine_capacity}</p>
              <p>Color: {vehicle.vehicle_specifications.color}</p>
              <p>Rental Rate: {vehicle.rental_rate}</p>
              <div className="card-actions justify-end">
                <div className={`badge ${vehicle.availability ? 'badge-success' : 'badge-error'}`}>
                  {vehicle.availability ? 'Available' : 'Unavailable'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Vehicles;
