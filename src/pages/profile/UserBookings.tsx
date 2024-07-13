import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { RootState } from '../../app/store';
import { bookingVehicleAPI } from '../../features/booking/bookingAPI';
import { vehiclesAPI } from '../../features/vehicles/Vehicles';

const UserBookings = () => {
    const user = useSelector((state: RootState) => state.user);
    const id = user.user?.userID;
    const user_id = id ? id : 0;

    // Fetch user-specific bookings data
    const { data: bookingData, isLoading: bookingLoading, error: bookingError } = bookingVehicleAPI.useGetUserBookingQuery(user_id, {
        refetchOnMountOrArgChange: true,
    });

    // Fetch vehicles data
    const { data: vehicleData, isLoading: vehicleLoading, error: vehicleError } = vehiclesAPI.useGetVehiclesQuery();

    // Function to format ISO date string
    const formatDate = (isoDate: string | number | Date) => {
        return format(new Date(isoDate), 'MM/dd/yyyy HH:mm:ss');
    };

    // Function to get vehicle details by vehicle_id
    const getVehicleDetails = (vehicleId: number) => {
        if (vehicleData) {
            console.log('Vehicle Data:', vehicleData);
            
            const vehicle = vehicleData.find(v => v.vehicle_id === vehicleId);
            if (vehicle) {
                return `${vehicle.vehicle_specifications?.manufacturer} ${vehicle.vehicle_specifications?.model}`;
            } else {
                console.log(`Vehicle with ID ${vehicleId} not found`);
            }
        }
        return 'Unknown Vehicle';
    };

    if (bookingLoading || vehicleLoading) {
        return <div>Loading...</div>;
    }

    if (bookingError || vehicleError) {
        return <div>Error loading data</div>;
    }

    if (!bookingData || bookingData.length === 0) {
        return <div>No bookings</div>;
    }

    return (
        <div className='card shadow-xl h-fit bg-base-100 w-1/2 m-auto rounded-md'>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Vehicle Details</th>
                            <th>Booking Date</th>
                            <th>Return Date</th>
                            <th>Total Amount</th>
                            <th>Booking Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookingData.map((booking) => {
                            console.log('Booking:', booking);
                            return (
                                <tr key={booking.booking_id}>
                                    <td>{booking.booking_id}</td>
                                    <td>{getVehicleDetails(booking.vehicle_id)}</td>
                                    <td>{formatDate(booking.booking_date)}</td>
                                    <td>{formatDate(booking.return_date)}</td>
                                    <td>{booking.total_amount}</td>
                                    <td>{booking.booking_status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserBookings;
