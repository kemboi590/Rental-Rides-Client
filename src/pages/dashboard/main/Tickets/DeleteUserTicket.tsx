import { TicketAPI } from "../../../../features/Tickets/AllTickets";
import { Toaster, toast } from 'sonner';
import { TypeTicket } from "../../../../features/Tickets/AllTickets";
interface DeleteUserTicketProps {
    ticket: TypeTicket | null;
    modalId: string;
}

const DeleteUserTicket = ({ ticket, modalId  }: DeleteUserTicketProps) => {
    const [deleteTicket] = TicketAPI.useDeleteTicketMutation();

    const handleDelete = async () => {
        if (ticket) {
            try {
                await deleteTicket(ticket.ticket_id).unwrap();
                toast.success('Ticket deleted successfully!');
                (document.getElementById(modalId) as HTMLDialogElement)?.close();
            } catch (err) {
                toast.error('Failed to delete ticket.');
            }
        }
    };

    const handleCloseModal = () => {
        toast.warning('Deletion cancelled');
        
        (document.getElementById(modalId) as HTMLDialogElement)?.close();
    };

    return (
        <div>
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
            <h3 className='text-center text-base lg:text-lg py-3 text-webcolor font-semibold'>
                Are you sure you want to delete the following ticket?
            </h3>
            {ticket && (
                <div>
                    <table className='table-auto m-auto w-full lg:w-[80%]'>
                        <tbody>
                            <tr>
                                <td className='border px-4 py-1'>ID</td>
                                <td className='border px-4 py-1'>{ticket.ticket_id}</td>
                            </tr>
                            <tr>
                                <td className='border px-4 py-1'>Subject</td>
                                <td className='border px-4 py-1'>{ticket.subject}</td>
                            </tr>
                            <tr>
                                <td className='border px-4 py-1'>Description</td>
                                <td className='border px-4 py-1'>{ticket.description}</td>
                            </tr>
                            <tr>
                                <td className='border px-4 py-1'>Status</td>
                                <td className='border px-4 py-1'>{ticket.status}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            <div className='flex justify-around mt-4'>
                <button className="btn bg-webcolor text-text-light hover:text-black" onClick={handleCloseModal}>
                    No, cancel
                </button>
                <button className="btn bg-red-600 text-white hover:bg-red-700" onClick={handleDelete}>
                    Yes, I confirm
                </button>
            </div>
        </div>
    );
};

export default DeleteUserTicket;
