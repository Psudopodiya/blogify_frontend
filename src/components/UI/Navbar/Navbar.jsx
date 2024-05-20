import { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const {
        data: userProfile,
        isLoading,
        error,
    } = useFetch('/api/user/profile');

    const handleLogout = () => {
        setIsLoggedIn(false);
    };
    return (
        <nav className="bg-gray-900">
            <div className="container mx-auto flex items-center justify-between px-4 py-2">
                <Link to="/" className="text-lg font-semibold text-white">
                    Blogify
                </Link>
                <ul className="flex items-center space-x-4">
                    <li>
                        <Link
                            to="/blogs"
                            className="text-white hover:text-gray-300"
                        >
                            Blogs
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className="text-white hover:text-gray-300"
                        >
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/awards"
                            className="text-white hover:text-gray-300"
                        >
                            Awards and Recognitions
                        </Link>
                    </li>
                </ul>
                <div className="flex items-center space-x-4">
                    {isLoggedIn ? (
                        <>
                            {isLoading ? (
                                <div>Loading...</div>
                            ) : error ? (
                                <div>Error: {error}</div>
                            ) : (
                                <img
                                    src={userProfile?.profileImage}
                                    alt="Profile"
                                    className="h-8 w-8 rounded-full"
                                />
                            )}
                            <button
                                onClick={handleLogout}
                                className="text-white hover:text-gray-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <div>
                            <Link
                                to="/login"
                                className="text-white hover:text-gray-300"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="text-white hover:text-gray-300"
                            >
                                Signup
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
