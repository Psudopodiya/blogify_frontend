import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const SignUpForm = () => {
    const [alert, setAlert] = useState({ open: false, type: "", message: "" });
    const { register: registerUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors: formErrors, isSubmitting },
    } = useForm();

    const onSubmit = async (formData) => {
        const response = await registerUser(
            formData.username,
            formData.email,
            formData.password,
        );

        if (response.error) {
            const errorMessages = Object.values(response.error).flatMap(
                (errors) => errors,
            );
            setAlert({
                open: true,
                type: "error",
                message: (
                    <div>
                        <ul
                            style={{
                                listStyleType: "disc",
                                paddingLeft: "20px",
                            }}
                        >
                            {errorMessages.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                ),
            });
        } else {
            setAlert({
                open: true,
                type: "success",
                message: "Registration successful! Redirecting to login...",
            });
        }
    };

    useEffect(() => {
        if (alert.open) {
            const timer = setTimeout(() => {
                setAlert({ ...alert, open: false });
                if (alert.type === "success") {
                    navigate("/login");
                }
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Username
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            {...register("username", {
                                required: "Username is required",
                            })}
                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {formErrors.username && (
                            <span className="text-red-500">
                                {formErrors.username.message}
                            </span>
                        )}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address",
                                },
                            })}
                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {formErrors.email && (
                            <span className="text-red-500">
                                {formErrors.email.message}
                            </span>
                        )}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                    </label>
                    <div className="mt-2">
                        <input
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters",
                                },
                            })}
                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {formErrors.password && (
                            <span className="text-red-500">
                                {formErrors.password.message}
                            </span>
                        )}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Confirm Password
                    </label>
                    <div className="mt-2">
                        <input
                            type="password"
                            {...register("confirmPassword", {
                                required: "Confirm Password is required",
                                validate: (value) =>
                                    value === watch("password") ||
                                    "Passwords don't match",
                            })}
                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {formErrors.confirmPassword && (
                            <span className="text-red-500">
                                {formErrors.confirmPassword.message}
                            </span>
                        )}
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {isSubmitting ? "Submitting..." : "Sign up"}
                    </button>
                </div>
            </form>

            <Fade
                in={alert.open}
                timeout={{ enter: 500, exit: 500 }}
                className="mt-5"
            >
                <Alert severity={alert.type} className="mb-4">
                    {alert.message}
                </Alert>
            </Fade>
        </div>
    );
};

export default SignUpForm;
