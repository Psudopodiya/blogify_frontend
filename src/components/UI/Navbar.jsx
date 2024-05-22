import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const {
        data: userProfile,
        isLoading,
        error,
    } = useFetch("/api/user/profile");

    const handleLogout = () => {
        setIsLoggedIn(false);
    };
    return (
        <nav>
            <div className="mx-auto flex items-center justify-between px-4 py-2">
                <h1 className="text-4xl font-semibold ">Blogify</h1>
                <ul className="flex items-center space-x-4">
                    <li>
                        <Link to="/blogs" className=" hover:text-gray-300">
                            Blogs
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className=" hover:text-gray-300">
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link to="/awards" className=" hover:text-gray-300">
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
                                className=" hover:text-gray-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <div>
                            <Link to="/login" className=" hover:text-gray-300">
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className=" hover:text-gray-300"
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
