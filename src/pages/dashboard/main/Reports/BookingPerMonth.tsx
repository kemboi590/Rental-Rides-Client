import { useEffect, useState } from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import { bookingVehicleAPI, Tbooking } from './../../../../features/booking/bookingAPI';

interface ChartData {
  name: string;
  bookings: number;
}

const BookingPerMonth = () => {
  const page = undefined;
  const fetchDuration = 10000;
  const { data: bookings } = bookingVehicleAPI.useGetBookingVehicleQuery(page, {
    pollingInterval: fetchDuration, refetchOnMountOrArgChange: true
  });

  const [chartData, setChartData] = useState<ChartData[]>([]);
  
  useEffect(() => {
    if (bookings) {
      // Transform booking data
      const bookingsByMonth = bookings.reduce((acc: { [key: string]: number }, booking: Tbooking) => {
        const monthYear = new Date(booking.booking_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
        if (!acc[monthYear]) {
          acc[monthYear] = 0;
        }
        acc[monthYear]++;
        return acc;
      }, {});
  
      // Prepare data for chart
      const data = Object.keys(bookingsByMonth).map(key => ({
        name: key,
        bookings: bookingsByMonth[key],
      }));
  
      setChartData(data);
    }
  }, [bookings]);

  return (
    <div className='bg-slate-200 min-h-screen p-4'>
      <div className='card mx-auto bg-white w-full rounded-md border-2 p-4'>
        <h2 className="text-center text-xl p-2 rounded-t-md text-webcolor font-bold">Booking Per Month Report</h2>
        
        <div className='mt-4'>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default BookingPerMonth;
