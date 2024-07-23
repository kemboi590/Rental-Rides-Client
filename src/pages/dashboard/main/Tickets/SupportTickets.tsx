import { TicketAPI } from "../../../../features/Tickets/AllTickets";
import { usersAPI } from "../../../../features/users/usersAPI";
import { useState } from 'react';
import { Toaster, toast } from 'sonner';

function SupportTickets() {
  const page = undefined;
  const fetchDuration = 10000;

  // Fetch tickets data
  const { data: tickets, isLoading: ticketsLoading, error: ticketsError, refetch: refetchTickets } = TicketAPI.useGetTicketsQuery(page, {
    pollingInterval: fetchDuration, refetchOnMountOrArgChange: true
  });
  console.log(tickets);

  // Update Ticket
  const [updateTicket] = TicketAPI.useUpdateTicketMutation();
  const [isUpdatingTicket, setIsUpdatingTicket] = useState<number | null>(null);

  // Fetch users data
  const { data: usersData, isLoading: usersLoading, error: usersError } = usersAPI.useGetUsersQuery(page, {
    pollingInterval: fetchDuration, refetchOnMountOrArgChange: true
  });

  // State for filters
  const [filters, setFilters] = useState({
    name: '',
    status: 'All',
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

  const handleCloseTicket = async (ticket_id: number, user_id: number, subject: string, description: string) => {
    setIsUpdatingTicket(ticket_id);
    try {
      await updateTicket({ ticket_id, user_id, subject, description, status: 'Closed' });
      toast.success('Ticket closed successfully');
      refetchTickets(); 
    } catch (error) {
      console.error('Error closing ticket', error);
      toast.error('Error closing ticket');
    } finally {
      setIsUpdatingTicket(null);
    }
  };

  const handleReopenTicket = async (ticket_id: number, user_id: number, subject: string, description: string) => {
    setIsUpdatingTicket(ticket_id);
    try {
      await updateTicket({ ticket_id, user_id, subject, description, status: 'Open' });
      toast.success('Ticket reopened successfully');
      refetchTickets(); 
    } catch (error) {
      console.error('Error reopening ticket', error);
      toast.error('Error reopening ticket');
    } finally {
      setIsUpdatingTicket(null);
    }
  };

  // Function to determine status class based on ticket status
  const getStatusClassName = (status: string) => {
    switch (status) {
      case 'Closed':
        return 'bg-green-400 text-white';
      case 'Open':
        return 'bg-red-400 text-white';
      default:
        return '';
    }
  };

  // Handle filter input changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilters({
      name: '',
      status: 'All',
    });
  };

  // Filter tickets
  const filteredTickets = tickets?.filter(ticket => {
    const { name, status } = filters;
    const matchesName = name ? getUserFullName(ticket.user_id).toLowerCase().includes(name.toLowerCase()) : true;
    const matchesStatus = status === 'All' || ticket.status === status;
    return matchesName && matchesStatus;
  });

  return (
    <div className="overflow-x-auto">
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
      <h2 className="text-center text-xl p-2 rounded-t-md text-webcolor font-bold border-b-2 border-slate-500">All Support Tickets</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-4 px-4 py-2">
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          placeholder="Filter by user name"
          className="input input-bordered w-full md:w-1/3"
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="select select-bordered w-full md:w-1/3"
        >
          <option value="All">All Statuses</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>
        <button onClick={handleResetFilters} className="btn bg-webcolor text-text-light hover:text-black border-none">
          Reset Filters
        </button>
      </div>

      {(ticketsLoading || usersLoading) && <div>Loading...</div>}
      {(ticketsError || usersError) && <div>Error loading data</div>}
      {filteredTickets && filteredTickets.length === 0 && <div>No support tickets</div>}
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Full Name</th>
            <th>Subject</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets && filteredTickets.map((ticket) => (
            <tr key={ticket.ticket_id}>
              <td>{ticket.ticket_id}</td>
              <td>{getUserFullName(ticket.user_id)}</td>
              <td>{ticket.subject}</td>
              <td>{ticket.description}</td>
              <td>
                <span className={`inline-block px-2 py-1 rounded ${getStatusClassName(ticket.status)}`}>
                  {ticket.status}
                </span>
              </td>
              <td>
                {ticket.status === 'Closed' ? (
                  <button
                    className="btn bg-blue-500 text-white mr-2"
                    onClick={() => handleReopenTicket(ticket.ticket_id, ticket.user_id, ticket.subject, ticket.description)}
                    disabled={isUpdatingTicket === ticket.ticket_id}
                  >
                    {isUpdatingTicket === ticket.ticket_id ? (
                      <div className='flex items-center'>
                        <span className="loading loading-spinner text-text-light"></span>
                        <span> Reopening...</span>
                      </div>
                    ) : (
                      "Reopen Ticket"
                    )}
                  </button>
                ) : (
                  <button
                    className="btn bg-yellow-500 text-text-light hover:text-black"
                    onClick={() => handleCloseTicket(ticket.ticket_id, ticket.user_id, ticket.subject, ticket.description)}
                    disabled={isUpdatingTicket === ticket.ticket_id}
                  >
                    {isUpdatingTicket === ticket.ticket_id ? (
                      <div className='flex items-center'>
                        <span className="loading loading-spinner text-text-light"></span>
                        <span> Closing...</span>
                      </div>
                    ) : (
                      "Close Ticket"
                    )}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SupportTickets;
