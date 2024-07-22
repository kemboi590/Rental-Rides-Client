import { usersAPI, TUser } from "../../../features/users/usersAPI";
import { useState } from 'react';
import { Toaster, toast } from 'sonner';

function Account() {
  const { data: usersData, isLoading: usersLoading, error: usersError, refetch: refetchUsers } = usersAPI.useGetUsersQuery();
  const [isDisabling, setIsDisabling] = useState<number | null>(null);
  const [updateUser] = usersAPI.useUpdateUserMutation();

  const [filters, setFilters] = useState({
    name: '',
    email: '',
    address: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleResetFilters = () => {
    setFilters({
      name: '',
      email: '',
      address: '',
    });
  };

  const handleDisableUser = async (userId: number) => {
    setIsDisabling(userId);
    try {
      await updateUser({ id: userId, role: 'disabled' });
      toast.success('User disabled successfully');
      refetchUsers();
    } catch (error) {
      console.error('Error disabling user', error);
      toast.error('Error disabling user');
    } finally {
      setIsDisabling(null);
    }
  };

  if (usersLoading) {
    return <div>Loading...</div>;
  }

  if (usersError) {
    return <div>Error loading users</div>;
  }

  if (!usersData || usersData.length === 0) {
    return <div>No Users Found</div>;
  }

  const filteredUsers = usersData.filter((user: TUser) => {
    const { name, email, address } = filters;
    const matchesName = name ? user.full_name.toLowerCase().includes(name.toLowerCase()) : true;
    const matchesEmail = email ? user.email.toLowerCase().includes(email.toLowerCase()) : true;
    const matchesAddress = address ? user.address.toLowerCase().includes(address.toLowerCase()) : true;
    return matchesName && matchesEmail && matchesAddress;
  });

  return (
    <>
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
      <div className="overflow-x-auto text-base-content rounded-lg p-4">
        <h2 className="text-center text-xl p-2 rounded-t-md text-webcolor font-bold">All User Accounts</h2>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleInputChange}
            placeholder="Filter by name"
            className="input input-bordered w-full md:w-1/3"
          />
          <input
            type="text"
            name="email"
            value={filters.email}
            onChange={handleInputChange}
            placeholder="Filter by email"
            className="input input-bordered w-full md:w-1/3"
          />
          <input
            type="text"
            name="address"
            value={filters.address}
            onChange={handleInputChange}
            placeholder="Filter by address"
            className="input input-bordered w-full md:w-1/3"
          />
          <button onClick={handleResetFilters} className="btn bg-webcolor text-text-light hover:text-black border-none">
            Reset Filters
          </button>
        </div>

        <table className="table table-zebra">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Contact Phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user: TUser) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.full_name}</td>
                <td>{user.email}</td>
                <td>{user.contact_phone}</td>
                <td>{user.address}</td>
                <td>
                  <button
                    className="btn bg-webcolor text-text-light hover:text-black border-none"
                    onClick={() => handleDisableUser(user.id)}
                    disabled={isDisabling === user.id}
                  >
                    {isDisabling === user.id ? (
                      <div className='flex items-center'>
                        <span className="loading loading-spinner text-text-light"></span>
                        <span> Disabling...</span>
                      </div>
                    ) : (
                      "Disable"
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Account;
