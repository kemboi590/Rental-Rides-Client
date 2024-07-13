import { usersAPI } from "../../../features/users/usersAPI";
import { TUser } from "../../../features/users/usersAPI"; 

function Account() {
    const { data: usersData, isLoading: usersLoading, error: usersError } = usersAPI.useGetUsersQuery();

    return (
        <div className="overflow-x-auto text-base-content rounded-lg p-4">
            {usersLoading && <div>Loading...</div>}
            {usersError && <div>Error loading users</div>}
            {usersData && usersData.length === 0 && <div>No Users Found</div>}
            
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Contact Phone</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {usersData && usersData.map((user: TUser) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.full_name}</td>
                            <td>{user.email}</td>
                            <td>{user.contact_phone}</td>
                            <td>{user.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Account;
