import { format } from 'date-fns';
import { bookingVehicleAPI } from "../../../features/booking/bookingAPI";
import { vehiclesAPI } from './../../../features/vehicles/Vehicles';
import { usersAPI } from '../../../features/users/usersAPI';

function AllBookings() {
  const page = void 0;
  const fetchDuration =10000;

  // Fetch bookings data
  const { data: bookings, isLoading: bookingLoading, error: bookingError } = bookingVehicleAPI.useGetBookingVehicleQuery(page, {
    pollingInterval: fetchDuration, refetchOnMountOrArgChange: true
  });

  // Fetch vehicles data
  const { data: vehicleData, isLoading: vehicleLoading, error: vehicleError } = vehiclesAPI.useFetchCarSpecsQuery(page, {
    pollingInterval: fetchDuration, refetchOnMountOrArgChange: true
  });

  // Fetch users data
  const { data: usersData, isLoading: usersLoading, error: usersError } = usersAPI.useGetUsersQuery(page, {
    pollingInterval: fetchDuration, refetchOnMountOrArgChange: true
  });

  // Function to format ISO date string
  const formatDate = (isoDate: string | number | Date) => {
    return format(new Date(isoDate), 'MM/dd/yyyy HH:mm:ss');
  };

  // Function to get vehicle details by vehicle_id
  const getVehicleDetails = (vehicleId: number) => {
    if (vehicleData) {
      const vehicle = vehicleData.find((v: { vehicle_id: number; }) => v.vehicle_id === vehicleId);
      if (vehicle) {
        return `${vehicle.vehicle_specifications?.manufacturer} ${vehicle.vehicle_specifications?.model}`;
      }
    }
    return 'Unknown Vehicle';
  };

  // Function to get user full name by user_id
  const getUserFullName = (userId: number) => {
    if (usersData) {
      console.log(usersData);
      const user = usersData.find(u => u.id === userId);
      if (user) {
        return user.full_name;
      }
    }
    return 'Unknown User';
  };

  return (
    <div className="overflow-x-auto">
      {(bookingLoading || vehicleLoading || usersLoading) && <div>Loading...</div>}
      {(bookingError || vehicleError || usersError) && <div>Error loading data</div>}
      {bookings && bookings.length === 0 && <div>No bookings</div>}
      <table className="table table-xs">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>User ID</th>
            <th>User Full Name</th>
            <th>Vehicle Details</th>
            <th>Booking Date</th>
            <th>Return Date</th>
            <th>Total Amount</th>
            <th>Booking Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings && bookings.map((booking) => (
            <tr key={booking.booking_id}>
              <td>{booking.booking_id}</td>
              <td>{booking.user_id}</td>
              <td>{getUserFullName(booking.user_id)}</td>
              <td>{getVehicleDetails(booking.vehicle_id)}</td>
              <td>{formatDate(booking.booking_date)}</td>
              <td>{formatDate(booking.return_date)}</td>
              <td>{booking.total_amount}</td>
              <td>{booking.booking_status}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Booking ID</th>
            <th>User ID</th>
            <th>User Full Name</th>
            <th>Vehicle Details</th>
            <th>Booking Date</th>
            <th>Return Date</th>
            <th>Total Amount</th>
            <th>Booking Status</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default AllBookings;
