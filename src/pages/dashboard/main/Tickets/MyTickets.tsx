import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { TicketAPI } from "../../../../features/Tickets/AllTickets";
import { useState } from 'react';
import CreateTicket from './CreateTicket'; // Import your CreateTicket component
import EditUserTicket from './EditUserTicket'; // Import your EditUserTicket component
import DeleteUserTicket from './DeleteUserTicket'; // Import your DeleteUserTicket component

const MyTickets = () => {
    const user = useSelector((state: RootState) => state.user);
    const user_id = user.user?.userID ?? 0;

    // Fetch user-specific tickets data
    const { data: ticketData, isLoading: ticketLoading, error: ticketError } = TicketAPI.useGetUserTicketsQuery(user_id, {
        refetchOnMountOrArgChange: true,
    });

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // State to manage create modal visibility
    const [editTicket, setEditTicket] = useState<any>(null); // State to manage edit modal visibility and data
    const [deleteTicket, setDeleteTicket] = useState<any>(null); // State to manage delete modal visibility and data

    if (ticketLoading) {
        return <div>Loading...</div>;
    }

    if (ticketError) {
        return <div>Error loading data</div>;
    }

    if (!ticketData || ticketData.length === 0) {
        return <div>No tickets</div>;
    }

    return (
        <div className='bg-slate-200 min-h-screen'>
            <div className='card mx-auto bg-slate-200 w-full rounded-md mb-5 border-2'>
                <h2 className="text-center text-xl p-2 rounded-t-md text-webcolor font-bold">Your Tickets</h2>
                <div className="flex justify-between items-center px-4 py-2">
                    <button
                        className="btn bg-webcolor text-text-light hover:text-black"
                        onClick={() => setIsCreateModalOpen(true)} // Open the create modal
                    >
                        Create Ticket
                    </button>
                </div>
                <div className="overflow-x-auto">
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
                                    <td className="px-4 py-2">{ticket.status}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            className="btn bg-blue-500 text-white mr-2"
                                            onClick={() => setEditTicket(ticket)} // Open the edit modal
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn bg-red-500 text-white"
                                            onClick={() => setDeleteTicket(ticket)} // Open the delete modal
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Ticket Modal */}
            {isCreateModalOpen && (
                <dialog className="modal" open>
                    <div className="modal-box w-11/12 max-w-5xl">
                        <form method="dialog" className="relative">
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={() => setIsCreateModalOpen(false)} // Close the modal
                            >
                                ✕
                            </button>
                        </form>
                        <CreateTicket />
                    </div>
                </dialog>
            )}

            {/* Edit Ticket Modal */}
            {editTicket && (
                <dialog className="modal" open>
                    <div className="modal-box w-11/12 max-w-5xl">
                        <form method="dialog" className="relative">
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={() => setEditTicket(null)} // Close the modal
                            >
                                ✕
                            </button>
                        </form>
                        <EditUserTicket ticket={editTicket} modalId="edit-ticket-modal" />
                    </div>
                </dialog>
            )}

            {/* Delete Ticket Modal */}
            {deleteTicket && (
                <dialog className="modal" open>
                    <div className="modal-box w-11/12 max-w-5xl">
                        <form method="dialog" className="relative">
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={() => setDeleteTicket(null)} // Close the modal
                            >
                                ✕
                            </button>
                        </form>
                        <DeleteUserTicket ticket={deleteTicket} modalId="delete-ticket-modal" />
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default MyTickets;
