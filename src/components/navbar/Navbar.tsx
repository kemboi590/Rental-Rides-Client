import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { logOut } from "../../features/users/userSlice";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const username = user.user?.name;
    const userRole = user.user?.role;

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsDropdownOpen(false);
            }
        };

        const closeMenu = () => {
            if (isDropdownOpen) {
                setIsDropdownOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener('click', closeMenu);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('click', closeMenu);
        };
    }, [isDropdownOpen]);

    const handleLogout = () => {
        dispatch(logOut());
        navigate('/login');
    }

    return (
        <div className="navbar bg-base-100 border-b-2">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-2xl font-bold text-webcolor ml-6 md:ml-12">RentalRides</Link>
            </div>

            <div className="flex-none gap-2">
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-base">
                        <li><Link to="/">Home</Link></li>
                        <li><a href="#">About</a></li>
                        {userRole !== 'disabled' && (
                            <li><Link to="/dashboard/vehicles">Dashboard</Link></li>
                        )}
                        <li><a href="#">Contact</a></li>
                        {!username && (
                            <>
                                <li><Link to="/register">Register</Link></li>
                                <li><Link to="/login">Login</Link></li>
                            </>
                        )}
                        <li className="flex items-center justify-center ml-3">
                            {username ? `${username}` : ''}
                        </li>
                    </ul>
                </div>

                <div className="flex lg:hidden">
                    <button onClick={toggleDropdown} className="btn btn-circle">
                        {/* open icon */}
                        <svg
                            className={`swap-off fill-current ${isDropdownOpen ? 'hidden' : 'block'}`}
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 512 512">
                            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                        </svg>

                        {/* close icon */}
                        <svg
                            className={`swap-on fill-current ${isDropdownOpen ? 'block' : 'hidden'}`}
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 512 512">
                            <polygon
                                points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                        </svg>
                    </button>
                </div>

                {/* Small devices */}
                <div className={`fixed top-0 left-0 w-[60%] h-screen bg-gray-800 border-r border-gray-900 transform ${isDropdownOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-500 ease-in-out lg:hidden z-50`}>
                    <ul className="menu p-4">
                        <li className="border-b border-gray-300 py-2 text-text-light"><Link to="/">Home</Link></li>
                        <li className="border-b border-gray-300 py-2 text-text-light"><a href="#">about</a></li>
                        {userRole !== 'disabled' && (
                            <li className="border-b border-gray-300 py-2 text-text-light"><Link to="/dashboard/vehicles">Dashboard</Link></li>
                        )}
                        <li className="border-b border-gray-300 py-2 text-text-light"><a href="#">Contact</a></li>
                        {!username && (
                            <>
                                <li className="border-b border-gray-300 py-2 text-text-light"><Link to="/register">Register</Link></li>
                                <li className="border-b border-gray-300 py-2 text-text-light"><Link to="/login">Login</Link></li>
                            </>
                        )}
                    </ul>
                </div>

                {username && (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} className="btn btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User Avatar"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 pt-4 shadow">
                            <li>
                                <Link to="/dashboard/profile" className="justify-between pb-2"> Profile</Link>
                            </li>
                            <li><a onClick={handleLogout} className="pt-2">Logout</a></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
