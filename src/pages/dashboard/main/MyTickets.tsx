import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { TicketAPI } from "../../../features/Tickets/AllTickets";

const MyTickets = () => {
    const user = useSelector((state: RootState) => state.user);
    const id = user.user?.userID;
    const user_id = id ? id : 0;

    // Fetch user-specific tickets data
    const { data: ticketData, isLoading: ticketLoading, error: ticketError } = TicketAPI.useGetUserTicketsQuery(user_id, {
        refetchOnMountOrArgChange: true,
    });

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
        <>
            <h2 className="text-center text-xl font-semibold text-text-light bg-webcolor p-2 rounded-t-md">Your Tickets</h2>
            <div className='card shadow-xl mx-auto bg-slate-200 w-full rounded-md mb-5 border-2'>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                            <tr className="bg-slate-800">
                                <th className="px-4 py-2 text-left text-text-light">Ticket ID</th>
                                <th className="px-4 py-2 text-left text-text-light">Subject</th>
                                <th className="px-4 py-2 text-left text-text-light">Description</th>
                                <th className="px-4 py-2 text-left text-text-light">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ticketData.map((ticket) => (
                                <tr key={ticket.ticket_id} className="border-b border-slate-600">
                                    <td className="px-4 py-2">{ticket.ticket_id}</td>
                                    <td className="px-4 py-2">{ticket.subject}</td>
                                    <td className="px-4 py-2">{ticket.description}</td>
                                    <td className="px-4 py-2">{ticket.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default MyTickets;
