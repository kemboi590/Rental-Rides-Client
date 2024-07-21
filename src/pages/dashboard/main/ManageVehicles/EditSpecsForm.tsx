import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { VSpecifications } from '../../../../features/vehicles/vehicleSpecs';
import { VehicleSpecificationsAPI } from '../../../../features/vehicles/vehicleSpecs';
import { Toaster, toast } from 'sonner';
import { useState, useEffect } from 'react';

interface EditSpecsFormProps {
  selectedSpec: VSpecifications | null;
  modalId: string;
}

const validationSchema = yup.object().shape({
  manufacturer: yup.string().required('Manufacturer is required'),
  model: yup.string().required('Model is required'),
  year: yup.number().min(2000, 'Year must be between 2000 and 2024').max(2024, 'Year must be between 2000 and 2024').required('Year is required'),
  fuel_type: yup.string().required('Fuel Type is required'),
  engine_capacity: yup.string().required('Engine Capacity is required'),
  transmission: yup.string().required('Transmission is required'),
  seating_capacity: yup.number().required('Seating Capacity is required'),
  color: yup.string().required('Color is required'),
  features: yup.string().required('Features are required'),
});

const EditSpecsForm = ({ selectedSpec, modalId }: EditSpecsFormProps) => {
  const id = selectedSpec?.vehicleSpec_id || 0;
  const [updateVehicleSpecifications] = VehicleSpecificationsAPI.useUpdateVehicleSpecificationsMutation();
  const [isUpdating, setIsUpdating] = useState(false); // State for updating loader

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => { // Populate form fields with selected spec data when available
    if (selectedSpec) {
      setValue('manufacturer', selectedSpec.manufacturer);
      setValue('model', selectedSpec.model);
      setValue('year', selectedSpec.year);
      setValue('fuel_type', selectedSpec.fuel_type);
      setValue('engine_capacity', selectedSpec.engine_capacity);
      setValue('transmission', selectedSpec.transmission);
      setValue('seating_capacity', selectedSpec.seating_capacity);
      setValue('color', selectedSpec.color);
      setValue('features', selectedSpec.features);
    }
  }, [selectedSpec, setValue]);

  const onSubmit = async (data: any) => {
    try {
      setIsUpdating(true); // Show updating loader
      await updateVehicleSpecifications({ id, ...data }).unwrap();
      toast.success('Specification updated successfully');
      setTimeout(() => {
        (document.getElementById(modalId) as HTMLDialogElement)?.close();
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update specification');
    } finally {
      setIsUpdating(false); // Hide updating loader
    }
  };

  const handleCloseModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  setTimeout(() => {
    (document.getElementById(modalId) as HTMLDialogElement)?.close();
  }, 1000);
    toast.warning('Update cancelled');
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
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className='flex flex-wrap gap-4' >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="manufacturer">
              Manufacturer
            </label>
            <input
              id="manufacturer"
              type="text"
              {...register('manufacturer')}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.manufacturer ? 'border-red-500' : ''}`}
            />
            {errors.manufacturer && <p className="text-red-500 text-xs italic">{errors.manufacturer.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="model">
              Model
            </label>
            <input
              id="model"
              type="text"
              {...register('model')}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  ${errors.model ? 'border-red-500' : ''}`}
            />
            {errors.model && <p className="text-red-500 text-xs italic">{errors.model.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
              Year
            </label>
            <input
              id="year"
              type="number"
              {...register('year')}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.year ? 'border-red-500' : ''}`}
            />
            {errors.year && <p className="text-red-500 text-xs italic">{errors.year.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fuel_type">
              Fuel Type
            </label>
            <input
              id="fuel_type"
              type="text"
              {...register('fuel_type')}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.fuel_type ? 'border-red-500' : ''}`}
            />
            {errors.fuel_type && <p className="text-red-500 text-xs italic">{errors.fuel_type.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="engine_capacity">
              Engine Capacity
            </label>
            <input
              id="engine_capacity"
              type="string"
              {...register('engine_capacity')}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.engine_capacity ? 'border-red-500' : ''}`}
            />
            {errors.engine_capacity && <p className="text-red-500 text-xs italic">{errors.engine_capacity.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="transmission">
              Transmission
            </label>
            <input
              id="transmission"
              type="text"
              {...register('transmission')}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.transmission ? 'border-red-500' : ''}`}
            />
            {errors.transmission && <p className="text-red-500 text-xs italic">{errors.transmission.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="seating_capacity">
              Seating Capacity
            </label>
            <input
              id="seating_capacity"
              type="number"
              {...register('seating_capacity')}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.seating_capacity ? 'border-red-500' : ''}`}
            />
            {errors.seating_capacity && <p className="text-red-500 text-xs italic">{errors.seating_capacity.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
              Color
            </label>
            <input
              id="color"
              type="text"
              {...register('color')}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.color ? 'border-red-500' : ''}`}
            />
            {errors.color && <p className="text-red-500 text-xs italic">{errors.color.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="features">
              Features
            </label>
            <textarea
              id="features"
              {...register('features')}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.features ? 'border-red-500' : ''}`}
            ></textarea>
            {errors.features && <p className="text-red-500 text-xs italic">{errors.features.message}</p>}
          </div>

        </div>
        <div className="flex items-center justify-between">
          <button className="btn bg-webcolor text-text-light hover:text-black" onClick={handleCloseModal}>
            Discard Changes
          </button>

          <button className="bg-webcolor hover:bg-webcolor-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            {isUpdating ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </>
            ) : (
              'Update'
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditSpecsForm;
