import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TicketAPI } from "../../../../features/Tickets/AllTickets";
import { Toaster, toast } from 'sonner';
import { useEffect } from 'react';
import { TypeTicket } from '../../../../features/Tickets/AllTickets';

interface EditTicketFormProps {
    ticket: TypeTicket | null;
    modalId: string;
}

const validationSchema = yup.object().shape({
    subject: yup.string().required('Subject is required'),
    description: yup.string().required('Description is required'),
    status: yup.string().required('Status is required'),
});

const EditUserTicket = ({ ticket, modalId }: EditTicketFormProps) => {
    const id = Number(ticket?.ticket_id);
    console.log('ticket:', id);
    const userID= ticket?.user_id
    console.log('userID:', userID);
    const [updateTicket] = TicketAPI.useUpdateTicketMutation();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        if (ticket) {
            setValue('subject', ticket.subject);
            setValue('description', ticket.description);
            setValue('status', ticket.status);
        }
    }, [ticket, setValue]);

    const onSubmit = async (data:any) => {
        if (!id) {
            toast.error('Ticket ID is undefined.');
            return;
        }
        try {
            await updateTicket({ticket_id:id,user_id:userID, ...data }).unwrap();
            toast.success('Ticket updated successfully!');
            setTimeout(() => {
                (document.getElementById(modalId) as HTMLDialogElement)?.close();
            }, 1000);
        } catch (err) {
            console.log(err);
            toast.error('Failed to update ticket.');
        }
    };

    const handleCloseModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toast.warning('Update cancelled');
        setTimeout(() => {
            (document.getElementById(modalId) as HTMLDialogElement)?.close();
        }, 1000);
    };

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
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col w-3/4 m-auto'>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
                            Subject
                        </label>
                        <input
                            id="subject"
                            type="text"
                            {...register('subject')}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.subject ? 'border-red-500' : ''}`}
                        />
                        {errors.subject && <p className="text-red-500 text-xs italic">{errors.subject.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            {...register('description')}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none ${errors.description ? 'border-red-500' : ''}`}
                        />
                        {errors.description && <p className="text-red-500 text-xs italic">{errors.description.message}</p>}
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <button className="btn bg-webcolor text-text-light hover:text-black" onClick={handleCloseModal}>
                        Discard Changes
                    </button>
                    <button className="bg-webcolor hover:bg-webcolor-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Update
                    </button>
                </div>
            </form>
        </>
    );
};

export default EditUserTicket;
