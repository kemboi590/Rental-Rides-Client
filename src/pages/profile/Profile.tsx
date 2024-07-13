import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RootState } from '../../app/store';
import Navbar from '../../components/navbar/Navbar';
import { usersAPI } from '../../features/users/usersAPI';
import { useSelector } from "react-redux";
import { Toaster, toast } from 'sonner';
import UserBookings from './UserBookings';


type UserFormData = {
    full_name: string;
    email: string;
    contact_phone: string;
    address: string;
};

const schema = yup.object().shape({
    full_name: yup.string().required("Full name is required"),
    email: yup.string().email("Invalid email address").required("Email is required"),
    contact_phone: yup.string().required("Phone number is required"),
    address: yup.string().required("Address is required"),
});

const Profile = () => {
    const user = useSelector((state: RootState) => state.user);
    const role = user.user?.role;
    const id = user.user?.userID;
    const user_id = id ? id : 0;
    const { data: userData, isLoading, error, refetch } = usersAPI.useGetUserByIdQuery(user_id, {
        refetchOnMountOrArgChange: true,
    });
    const [updateUser] = usersAPI.useUpdateUserMutation();
    const [isEditMode, setIsEditMode] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<UserFormData>({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (userData) {
            reset({
                full_name: userData.full_name,
                email: userData.email,
                contact_phone: userData.contact_phone,
                address: userData.address,
            });
        }
    }, [userData, reset]);

    const onSubmit: SubmitHandler<UserFormData> = async (formData) => {
        try {
            await updateUser({ id: user_id, ...formData }).unwrap();
            setIsEditMode(false);
            refetch();
            toast.success("User updated successfully");
        } catch (err) {
            console.error("Error updating user", err);
            toast.error("Error updating user");
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading user data.</div>;
    }

    if (!userData) {
        return <div>No user data available.</div>;
    }

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
            <Navbar />
            <div className="card shadow-xl h-fit bg-base-100 w-1/2 m-auto rounded-md">
                <div className="card-body flex-row justify-evenly border-b-2 border-slate-600 w-full">
                    <div className="w-28 flex justify-center items-center">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" className="rounded-full" />
                    </div>

                    <div className="flex flex-col justify-center mt-2 w-1/2">
                        <h1 className="text-2xl font-bold">{userData.full_name}
                            <span className="badge bg-webcolor text-text-light mx-4 p-3">{role}</span></h1>
                        <p className="text-lg">Email: {userData.email}</p>
                        <p className="text-lg">Phone: {userData.contact_phone}</p>
                        <p className="text-lg">Address: {userData.address}</p>
                    </div>
                </div>

                <div className="flex justify-end p-4">
                    <button onClick={() => setIsEditMode(true)} className="btn bg-webcolor text-text-light hover:text-black border-none">Update Profile</button>
                </div>

                {isEditMode && (
                    <div className="p-4">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="form-control">
                                <label htmlFor="full_name" className="label">Full Name</label>
                                <input type="text" id="full_name" className="input input-bordered" {...register("full_name")} />
                                <p className="text-red-500">{errors.full_name?.message}</p>
                            </div>
                            <div className="form-control">
                                <label htmlFor="email" className="label">Email</label>
                                <input type="email" id="email" className="input input-bordered" {...register("email")} />
                                <p className="text-red-500">{errors.email?.message}</p>
                            </div>
                            <div className="form-control">
                                <label htmlFor="contact_phone" className="label">Phone Number</label>
                                <input type="text" id="contact_phone" className="input input-bordered" {...register("contact_phone")} />
                                <p className="text-red-500">{errors.contact_phone?.message}</p>
                            </div>
                            <div className="form-control">
                                <label htmlFor="address" className="label">Address</label>
                                <input type="text" id="address" className="input input-bordered" {...register("address")} />
                                <p className="text-red-500">{errors.address?.message}</p>
                            </div>
                            <div className="mt-4 flex justify-around p-4">
                                {/* cancel btn */}
                                <button onClick={() => setIsEditMode(false)} className="btn bg-red-400 text-text-light hover:text-black border-none">Cancel</button>
                                {/* save changes btn */}
                                <button type="submit" className="btn bg-webcolor text-text-light hover:text-black border-none">Save Changes</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>

            {/* User Bookings */}
            <UserBookings />
        </>
    );
}

export default Profile;
