import { usersAPI } from '../../../../features/users/usersAPI';
import { useEffect, useState } from 'react';

const CardsReport = () => {
  const { data: usersData, isLoading: usersLoading, error: usersError } = usersAPI.useGetUsersQuery();
  
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);

  useEffect(() => {
    if (usersData) {
      const usersCount = usersData.length;
      const customersCount = usersData.filter(user => user.role === 'user').length;
      const adminsCount = usersData.filter(user => user.role === 'admin').length;

      // Animation for counting numbers
      const duration = 1000;
      const steps = 30;
      const usersStep = usersCount / steps;
      const customersStep = customersCount / steps;
      const adminsStep = adminsCount / steps;

      let currentUsers = 0;
      let currentCustomers = 0;
      let currentAdmins = 0;

      const interval = setInterval(() => {
        currentUsers = Math.min(currentUsers + usersStep, usersCount);
        currentCustomers = Math.min(currentCustomers + customersStep, customersCount);
        currentAdmins = Math.min(currentAdmins + adminsStep, adminsCount);

        setTotalUsers(Math.floor(currentUsers));
        setTotalCustomers(Math.floor(currentCustomers));
        setTotalAdmins(Math.floor(currentAdmins));

        if (currentUsers >= usersCount && currentCustomers >= customersCount && currentAdmins >= adminsCount) {
          clearInterval(interval);
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }
  }, [usersData]);

  if (usersLoading) {
    return <div>Loading...</div>;
  }

  if (usersError) {
    return <div>Error loading users</div>;
  }

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold">Total Users</h3>
        <div className="text-4xl font-bold animate-pulse">{totalUsers}</div>
        <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center mt-2">{totalUsers}</div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold">Total Customers</h3>
        <div className="text-4xl font-bold animate-pulse">{totalCustomers}</div>
        <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center mt-2">{totalCustomers}</div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold">Total Admins</h3>
        <div className="text-4xl font-bold animate-pulse">{totalAdmins}</div>
        <div className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center mt-2">{totalAdmins}</div>
      </div>
    </div>
  );
}

export default CardsReport;
