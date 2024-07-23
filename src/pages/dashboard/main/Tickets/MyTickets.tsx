import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { TicketAPI } from "../../../../features/Tickets/AllTickets";
import { useState } from 'react';
import CreateTicket from './CreateTicket';
import EditUserTicket from './EditUserTicket';
import DeleteUserTicket from './DeleteUserTicket';
import { TypeTicket } from '../../../../features/Tickets/AllTickets';

const MyTickets = () => {
    const user = useSelector((state: RootState) => state.user);
    const user_id = user.user?.userID ?? 0;

    // Fetch user-specific tickets data
    const { data: ticketData, isLoading: ticketLoading, error: ticketError, refetch: refetchTickets } = TicketAPI.useGetUserTicketsQuery(user_id, {
        refetchOnMountOrArgChange: true,
    });

    // Update Ticket
    const [updateTicket] = TicketAPI.useUpdateTicketMutation();
    const [editTicket, setEditTicket] = useState<TypeTicket | null>(null);
    const [deleteTicket, setDeleteTicket] = useState<TypeTicket | null>(null);

    const handleDeleteTicket = (ticket: TypeTicket) => {
        setDeleteTicket(ticket);
        (document.getElementById('delete_ticket_modal') as HTMLDialogElement)?.showModal();
    }

    const handleEditTicket = (ticket: TypeTicket) => {
        setEditTicket(ticket);
        (document.getElementById('edit_ticket_modal') as HTMLDialogElement)?.showModal();
    }

    const handleReopenTicket = async (ticket: TypeTicket) => {
        try {
            await updateTicket({ ...ticket, status: 'Open' });
            refetchTickets()
        } catch (error) {
            console.error('Error reopening ticket', error);
        }
    }

    if (ticketLoading) {
        return <div>Loading...</div>;
    }

    if (ticketError) {
        return <div>Error loading data</div>;
    }

    return (
        <div className='bg-slate-200 min-h-screen'>
            <div className='card mx-auto bg-slate-200 w-full rounded-md mb-5 border-2'>
                <h2 className="text-center text-xl p-2 rounded-t-md text-webcolor font-bold">My Tickets</h2>
                <div className="flex justify-between items-center px-4 py-2">
                    <button
                        className="btn bg-webcolor text-text-light hover:text-black"
                        onClick={() => (document.getElementById('create_ticket') as HTMLDialogElement)?.showModal()}
                    >
                        Create Ticket
                    </button>
                </div>
                <div className="overflow-x-auto">
                    {ticketData && ticketData.length > 0 ? (
                        <table className="table-auto w-full">
                            <thead>
                                <tr className="bg-slate-700">
                                    <th className="px-4 py-2 text-left text-text-light">Ticket ID</th>
                                    <th className="px-4 py-2 text-left text-text-light">Subject</th>
                                    <th className="px-4 py-2 text-left text-text-light">Description</th>
                                    <th className="px-4 py-2 text-left text-text-light">Status</th>
                                    <th className="px-4 py-2 text-left text-text-light">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ticketData.map((ticket) => (
                                    <tr key={ticket.ticket_id} className="border-b border-slate-600">
                                        <td className="px-4 py-2">{ticket.ticket_id}</td>
                                        <td className="px-4 py-2">{ticket.subject}</td>
                                        <td className="px-4 py-2">{ticket.description}</td>
                                        <td className="px-4 py-2">
                                            <span className={`inline-block px-2 py-1 rounded ${getStatusClassName(ticket.status)}`}>
                                                {ticket.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            {ticket.status === 'Closed' ? (
                                                <button
                                                    className="btn bg-yellow-500 text-white mr-2"
                                                    onClick={() => handleReopenTicket(ticket)} // Reopen ticket
                                                >
                                                    Reopen
                                                </button>
                                            ) : null}
                                            <button
                                                className="btn bg-blue-500 text-white mr-2"
                                                onClick={() => handleEditTicket(ticket)} // Open the edit modal
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn bg-red-500 text-white"
                                                onClick={() => handleDeleteTicket(ticket)} // Open the delete modal
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center p-4">
                            You currently have no tickets. Click the button above to create a ticket.
                        </div>
                    )}
                </div>
            </div>

            {/* Create Ticket Modal */}

            <dialog id='create_ticket' className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <form method="dialog" className="relative">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <CreateTicket />
                </div>
            </dialog>

            {/* Edit Ticket Modal */}

            <dialog id='edit_ticket_modal' className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <form method="dialog" className="relative">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <EditUserTicket ticket={editTicket} modalId="edit_ticket_modal" />
                </div>
            </dialog>

            {/* Delete Ticket Modal */}
            <dialog id='delete_ticket_modal' className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <form method="dialog" className="relative">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <DeleteUserTicket ticket={deleteTicket} modalId="delete_ticket_modal" />
                </div>
            </dialog>
        </div>
    );
};

// Utility function for status styling
const getStatusClassName = (status: string) => {
    switch (status) {
        case 'Closed':
            return 'bg-green-200 text-green-800';
        case 'Open':
            return 'bg-red-200 text-red-800'; 
        default:
            return '';
    }
};

export default MyTickets;
