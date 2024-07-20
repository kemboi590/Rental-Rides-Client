import { VSpecifications } from '../../../features/vehicles/vehicleSpecs';
import { VehicleSpecificationsAPI } from '../../../features/vehicles/vehicleSpecs';
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
            (document.getElementById(modalId) as HTMLDialogElement).close();
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete specification');
        }
    };

    const handleCloseModal = () => {
        (document.getElementById(modalId) as HTMLDialogElement).close();
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

            <h3>Are you sure you want to delete the following specification?</h3>
            {spec && (
                <div>
                    <p>ID: {spec.vehicleSpec_id}</p>
                    <p>Manufacturer: {spec.manufacturer}</p>
                    <p>Model: {spec.model}</p>
                    <p>Year: {spec.year}</p>
                    <p>Fuel Type: {spec.fuel_type}</p>
                    <p>Engine Capacity: {spec.engine_capacity}</p>
                    <p>Transmission: {spec.transmission}</p>
                    <p>Seating Capacity: {spec.seating_capacity}</p>
                    <p>Color: {spec.color}</p>
                    <p>Features: {spec.features}</p>
                </div>
            )}

            <div className='flex justify-around'>
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
