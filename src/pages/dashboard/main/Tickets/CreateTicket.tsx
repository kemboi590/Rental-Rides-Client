import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { TicketAPI } from "../../../../features/Tickets/AllTickets";
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Toaster, toast } from 'sonner';

interface FormValues {
    subject: string;
    description: string;
}

const schema = yup.object().shape({
    subject: yup.string().required('Subject is required'),
    description: yup.string().required('Description is required'),
});

const CreateTicket = () => {
    const [createTicket] = TicketAPI.useCreateTicketMutation();
    const user = useSelector((state: RootState) => state.user);
    const user_id = user.user?.userID ?? 0;
    console.log('user_id:', user_id);

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            await createTicket({
                user_id: user_id,
                ...data
            }).unwrap();
            toast.success('Ticket created successfully!');
        } catch (error) {
            console.log('Failed to create ticket:', error);
            toast.error('Failed to create ticket.');
        }
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
            <h3 className="text-lg font-bold mb-4">Create a New Ticket</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                    <input
                        id="subject"
                        type="text"
                        {...register('subject')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        rows={4}
                        {...register('description')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="btn bg-webcolor text-text-light hover:text-black"
                    >
                        Create Ticket
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTicket;
