import { TicketAPI } from "../../../../features/Tickets/AllTickets";
import { usersAPI } from "../../../../features/users/usersAPI";

function SupportTickets() {
  const page = undefined;
  const fetchDuration = 10000;

  // Fetch tickets data
  const { data: tickets, isLoading: ticketsLoading, error: ticketsError } = TicketAPI.useGetTicketsQuery(page, {
    pollingInterval: fetchDuration, refetchOnMountOrArgChange: true
  });

  // Fetch users data
  const { data: usersData, isLoading: usersLoading, error: usersError } = usersAPI.useGetUsersQuery(page, {
    pollingInterval: fetchDuration, refetchOnMountOrArgChange: true
  });

  // Function to get user full name by user_id
  const getUserFullName = (userId: number) => {
    if (usersData) {
      const user = usersData.find(u => u.id === userId);
      if (user) {
        return user.full_name;
      }
    }
    return 'Unknown User';
  };

  return (
    <div className="overflow-x-auto">
      {(ticketsLoading || usersLoading) && <div>Loading...</div>}
      {(ticketsError || usersError) && <div>Error loading data</div>}
      {tickets && tickets.length === 0 && <div>No support tickets</div>}
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Full Name</th>
            <th>Subject</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tickets && tickets.map((ticket) => (
            <tr key={ticket.ticket_id}>
              <td>{ticket.ticket_id}</td>
              <td>{getUserFullName(ticket.user_id)}</td>
              <td>{ticket.subject}</td>
              <td>{ticket.description}</td>
              <td>{ticket.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SupportTickets;
