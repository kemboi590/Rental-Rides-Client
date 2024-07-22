import { usersAPI, TUser } from "../../../features/users/usersAPI";
import { useState } from 'react';
import { Toaster, toast } from 'sonner';

function Account() {
    const { data: usersData, isLoading: usersLoading, error: usersError, refetch: refetchUsers } = usersAPI.useGetUsersQuery();
    const [isDisabling, setIsDisabling] = useState<number | null>(null);
    const [updateUser] = usersAPI.useUpdateUserMutation();

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
                <h2 className="text-center text-xl p-2 rounded-t-md text-webcolor font-bold border-b-2 border-slate-500">All User Accounts</h2>

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
                        {usersData.map((user: TUser) => (
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
