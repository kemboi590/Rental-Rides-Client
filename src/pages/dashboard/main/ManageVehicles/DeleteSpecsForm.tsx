import { VSpecifications } from '../../../../features/vehicles/vehicleSpecs';
import { VehicleSpecificationsAPI } from '../../../../features/vehicles/vehicleSpecs';
import { Toaster, toast } from 'sonner';

interface DeleteSpecsFormProps {
    spec: VSpecifications | null;
    modalId: string;
}

function DeleteSpecsForm({ spec, modalId }: DeleteSpecsFormProps) {
    const id = spec?.vehicleSpec_id || 0;
    const [deleteVehicleSpecifications] = VehicleSpecificationsAPI.useDeleteVehicleSpecificationsMutation();

    const handleDeleteSpecs = async () => {
        try {
            await deleteVehicleSpecifications(id).unwrap();
            toast.success('Specification deleted successfully');
            setTimeout(() => {
                (document.getElementById(modalId) as HTMLDialogElement).close();
            }, 1000);
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete specification');
        }
    };

    const handleCloseModal = () => {
        toast.warning('Deletion cancelled');
        setTimeout(() => {
            (document.getElementById(modalId) as HTMLDialogElement).close();
        }, 1000);
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
                Are you sure you want to delete the following specification?</h3>
            {spec && (
                <div>
                    <table className='table-auto m-auto w-full lg:w-[80%]'>
                        <tbody>
                            <tr>
                                <td className='border px-4 py-1'>ID</td>
                                <td className='border px-4 py-1'>{spec.vehicleSpec_id}</td>
                            </tr>
                            <tr>
                                <td className='border px-4 py-1'>Manufacturer</td>
                                <td className='border px-4 py-1'>{spec.manufacturer}</td>
                            </tr>
                            <tr>
                                <td className='border px-4 py-1'>Model</td>
                                <td className='border px-4 py-1'>{spec.model}</td>
                            </tr>
                            <tr>
                                <td className='border px-4 py-1'>Year</td>
                                <td className='border px-4 py-1'>{spec.year}</td>
                            </tr>
                            <tr>
                                <td className='border px-4 py-1'>Fuel Type</td>
                                <td className='border px-4 py-1'>{spec.fuel_type}</td>
                            </tr>
                            <tr>
                                <td className='border px-4 py-1'>Engine Capacity</td>
                                <td className='border px-4 py-1'>{spec.engine_capacity}</td>
                            </tr>
                            <tr>
                                <td className='border px-4 py-1'>Transmission</td>
                                <td className='border px-4 py-1'>{spec.transmission}</td>
                            </tr>
                            <tr>
                                <td className='border px-4 py-1'>Seating Capacity</td>
                                <td className='border px-4 py-1'>{spec.seating_capacity}</td>
                            </tr>
                            <tr>
                                <td className='border px-4 py-1'>Color</td>
                                <td className='border px-4 py-1'>{spec.color}</td>
                            </tr>
                            <tr>
                                <td className='border px-4 py-1'>Features</td>
                                <td className='border px-4 py-1'>{spec.features}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            <div className='flex justify-around  mt-4'>
                {/* no btn */}
                <button className="btn bg-webcolor text-text-light hover:text-black" onClick={handleCloseModal}>
                    No, cancel
                </button>

                {/* yes btn */}
                <button className="btn bg-webcolor text-text-light hover:text-black" onClick={handleDeleteSpecs}>
                    Yes, I confirm
                </button>
            </div>
        </div>
    );
}

export default DeleteSpecsForm;
