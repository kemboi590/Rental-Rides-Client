import { Toaster, toast } from 'sonner';
import { vehiclesTableAPI } from '../../../../features/vehicles/vehicleTable';
import { Tvehicles } from '../../../../features/vehicles/vehicleTable';

interface DeleteVehicleFormProps {
    vehicle: Tvehicles | null;
    modalId: string;
}

const DeleteVehicleForm = ({ vehicle, modalId }: DeleteVehicleFormProps) => {
    const [deleteVehicle] = vehiclesTableAPI.useDeleteVehiclesTableMutation();

    const handleDelete = async () => {
        if (vehicle) {
            try {
                await deleteVehicle(vehicle.vehicle_id).unwrap();
                toast.success('Vehicle deleted successfully!');
                (document.getElementById(modalId) as HTMLDialogElement)?.close();
            } catch (err) {
                toast.error('Failed to delete vehicle.');
            }
        }
    };

    const handleCloseModal = () => {
        (document.getElementById(modalId) as HTMLDialogElement)?.close();
        toast.warning('Deletion cancelled');
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
                Are you sure you want to delete the following vehicle?
            </h3>
            {vehicle && (
                <div>
                    <table className='table-auto m-auto w-full lg:w-[80%]'>
                        <tbody>
                            <tr>
                                <td className='border px-4 py-1'>ID</td>
                                <td className='border px-4 py-1'>{vehicle.vehicle_id}</td>
                            </tr>
                            <tr>
                                <td className='border px-4 py-1'>Rental Rate</td>
                                <td className='border px-4 py-1'>{vehicle.rental_rate}</td>
                            </tr>
                            <tr>
                                <td className='border px-4 py-1'>Availability</td>
                                <td className='border px-4 py-1'>{vehicle.availability}</td>
                            </tr>
                            {/* Add other vehicle details here */}
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

export default DeleteVehicleForm;
