import { useState } from 'react';
import { VehicleSpecificationsAPI } from '../../../../features/vehicles/vehicleSpecs';
import { vehiclesTableAPI } from '../../../../features/vehicles/vehicleTable';
import CreateVehicle from './CreateVehicleSpecs';
import CreateVehicleForm from './CreateVehicleForm';
import EditSpecsForm from './EditSpecsForm';
import DeleteSpecsForm from './DeleteSpecsForm';
import EditVehicleForm from './EditVehicleForm';
import DeleteVehicleForm from './DeleteVehicleForm';
import { VSpecifications } from '../../../../features/vehicles/vehicleSpecs';
import { Tvehicles } from '../../../../features/vehicles/vehicleTable';

const VehicleSpecificationsTable = () => {
    const { data: vehicleSpecsData = [], isLoading: vehicleSpecsLoading, error: vehicleSpecsError } = VehicleSpecificationsAPI.useGetVehicleSpecificationsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const { data: vehiclesData = [], isLoading: vehiclesLoading, error: vehiclesError } = vehiclesTableAPI.useGetVehiclesTableQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const [selectedSpec, setSelectedSpec] = useState<VSpecifications | null>(null);
    const [selectedVehicle, setSelectedVehicle] = useState<Tvehicles | null>(null);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentVehicleSpecs = vehicleSpecsData?.slice(indexOfFirstRecord, indexOfLastRecord) || [];
    const currentVehicles = vehiclesData?.slice(indexOfFirstRecord, indexOfLastRecord) || [];

    const nextPage = () => {
        if (currentPage * recordsPerPage < vehicleSpecsData.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (vehicleSpecsLoading || vehiclesLoading) {
        return <div>Loading...</div>;
    }

    if (vehicleSpecsError || vehiclesError) {
        return <div>Error loading data</div>;
    }

    if (!vehicleSpecsData || vehicleSpecsData.length === 0) {
        return <div>No vehicle specifications</div>;
    }

    const handleEditSpec = (spec: VSpecifications) => {
        setSelectedSpec(spec);
        (document.getElementById('edit_specs_modal') as HTMLDialogElement)?.showModal();
    };

    const handleDeleteSpec = (spec: VSpecifications) => {
        setSelectedSpec(spec);
        (document.getElementById('delete_specs_modal') as HTMLDialogElement)?.showModal();
    };

    const handleEditVehicle = (vehicle: Tvehicles) => {
        setSelectedVehicle(vehicle);
        (document.getElementById('edit_vehicle_modal') as HTMLDialogElement)?.showModal();
    };

    const handleDeleteVehicle = (vehicle: Tvehicles) => {
        setSelectedVehicle(vehicle);
        (document.getElementById('delete_vehicle_modal') as HTMLDialogElement)?.showModal();
    };

    return (
        <div className='bg-slate-200 min-h-screen'>
            <div className='card mx-auto bg-slate-200 w-full rounded-md mb-5 border-2'>
                <h2 className="text-center text-xl p-2 rounded-t-md text-webcolor font-bold">Vehicle Specifications</h2>
                <div className="flex justify-between items-center px-4 py-2">
                    <button className="btn bg-webcolor text-text-light hover:text-black" onClick={() => (document.getElementById('add_spec_modal') as HTMLDialogElement)?.showModal()}>Add Specification</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                            <tr className="bg-slate-700">
                                <th className="px-4 py-2 text-left text-text-light">ID</th>
                                <th className="px-4 py-2 text-left text-text-light">Manufacturer</th>
                                <th className="px-4 py-2 text-left text-text-light">Model</th>
                                <th className="px-4 py-2 text-left text-text-light">Year</th>
                                <th className="px-4 py-2 text-left text-text-light">Fuel Type</th>
                                <th className="px-4 py-2 text-left text-text-light">Engine Capacity</th>
                                <th className="px-4 py-2 text-left text-text-light">Transmission</th>
                                <th className="px-4 py-2 text-left text-text-light">Seating Capacity</th>
                                <th className="px-4 py-2 text-left text-text-light">Color</th>
                                <th className="px-4 py-2 text-left text-text-light">Features</th>
                                <th className="px-4 py-2 text-left text-text-light">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentVehicleSpecs.map((spec) => (
                                <tr key={spec.vehicleSpec_id} className="border-b border-slate-700">
                                    <td className="px-4 py-2">{spec.vehicleSpec_id}</td>
                                    <td className="px-4 py-2">{spec.manufacturer}</td>
                                    <td className="px-4 py-2">{spec.model}</td>
                                    <td className="px-4 py-2">{spec.year}</td>
                                    <td className="px-4 py-2">{spec.fuel_type}</td>
                                    <td className="px-4 py-2">{spec.engine_capacity}</td>
                                    <td className="px-4 py-2">{spec.transmission}</td>
                                    <td className="px-4 py-2">{spec.seating_capacity}</td>
                                    <td className="px-4 py-2">{spec.color}</td>
                                    <td className="px-4 py-2">{spec.features}</td>
                                    <td className='flex gap-4'>
                                        <button className="btn bg-webcolor text-text-light hover:text-black" onClick={() => handleEditSpec(spec)}>Edit</button>
                                        <button className="btn bg-webcolor text-text-light hover:text-black" onClick={() => handleDeleteSpec(spec)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="join grid grid-cols-2 my-4 w-1/2 lg:w-1/6 m-auto">
                        <button className="join-item btn btn-outline" onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                        <button className="join-item btn btn-outline" onClick={nextPage} disabled={currentPage * recordsPerPage >= vehicleSpecsData.length}>Next</button>
                    </div>
                </div>
            </div>

            <div className='card mx-auto bg-slate-200 w-full rounded-md mb-5 border-2'>
                <h2 className="text-center text-xl p-2 rounded-t-md text-webcolor font-bold">Available Vehicles</h2>
                <div className="flex justify-between items-center px-4 py-2">
                    <button className="btn bg-webcolor text-text-light hover:text-black" onClick={() => (document.getElementById('add_vehicle_modal') as HTMLDialogElement)?.showModal()}>Add Vehicle</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                            <tr className="bg-slate-700">
                                <th className="px-4 py-2 text-left text-text-light">ID</th>
                                <th className="px-4 py-2 text-left text-text-light">Vehicle Specification ID</th>
                                <th className="px-4 py-2 text-left text-text-light">Rental Rate</th>
                                <th className="px-4 py-2 text-left text-text-light">Availability</th>
                                <th className="px-4 py-2 text-left text-text-light">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentVehicles.map((vehicle) => (
                                <tr key={vehicle.vehicle_id} className="border-b border-slate-700">
                                    <td className="px-4 py-2">{vehicle.vehicle_id}</td>
                                    <td className="px-4 py-2">{vehicle.vehicleSpec_id}</td>
                                    <td className="px-4 py-2">{vehicle.rental_rate}</td>
                                    <td className="px-4 py-2">{vehicle.availability ? 'Available' : 'Not Available'}</td>
                                    <td className='flex gap-4'>
                                        <button className="btn bg-webcolor text-text-light hover:text-black" onClick={() => handleEditVehicle(vehicle)}>Edit</button>
                                        <button className="btn bg-webcolor text-text-light hover:text-black" onClick={() => handleDeleteVehicle(vehicle)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="join grid grid-cols-2 my-4 w-1/2 lg:w-1/6 m-auto">
                        <button className="join-item btn btn-outline" onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                        <button className="join-item btn btn-outline" onClick={nextPage} disabled={currentPage * recordsPerPage >= vehiclesData.length}>Next</button>
                    </div>
                </div>
            </div>

            {/* Add Specification Modal */}
            <dialog id="add_spec_modal" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <form method="dialog" className="relative">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <CreateVehicle />
                </div>
            </dialog>

            {/* Add Vehicle Modal */}
            <dialog id="add_vehicle_modal" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <form method="dialog" className="relative">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <CreateVehicleForm />
                </div>
            </dialog>

            {/* Edit Specification Modal */}
            <dialog id="edit_specs_modal" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <form method="dialog" className="relative">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <EditSpecsForm selectedSpec={selectedSpec} modalId="edit_specs_modal" />
                </div>
            </dialog>

            {/* Delete Specification Modal */}
            <dialog id="delete_specs_modal" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <form method="dialog" className="relative">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <DeleteSpecsForm spec={selectedSpec} modalId="delete_specs_modal" />
                </div>
            </dialog>

            {/* Edit Vehicle Modal */}
            <dialog id="edit_vehicle_modal" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <form method="dialog" className="relative">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <EditVehicleForm vehicle={selectedVehicle} modalId="edit_vehicle_modal" />
                </div>
            </dialog>

            {/* Delete Vehicle Modal */}
            <dialog id="delete_vehicle_modal" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <form method="dialog" className="relative">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <DeleteVehicleForm vehicle={selectedVehicle} modalId="delete_vehicle_modal" />
                </div>
            </dialog>
        </div>
    );
};

export default VehicleSpecificationsTable;
