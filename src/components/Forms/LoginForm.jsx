import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState({ open: false, type: "", message: "" });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate("/");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await login(email, password);
        if (response.error) {
            setAlert({
                open: true,
                type: "error",
                message: response.error.detail,
            });
        } else {
            setAlert({
                open: true,
                type: "success",
                message: "Login successful! Redirecting...",
            });
        }
    };

    useEffect(() => {
        if (alert.open) {
            const timer = setTimeout(() => {
                setAlert({ ...alert, open: false });
                if (alert.type === "success") {
                    navigate("/");
                }
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [alert, navigate]);
    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        <div className="text-sm">
                            <a
                                href="#"
                                className="font-semibold text-indigo-600 hover:text-indigo-500"
                            >
                                Forgot password?
                            </a>
                        </div>
                    </div>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sign in
                    </button>
                </div>
            </form>

            <Fade
                in={alert.open}
                timeout={{ enter: 500, exit: 500 }}
                className="mt-5"
            >
                <Alert
                    // icon={<CheckIcon fontSize="inherit" />}
                    severity={alert.type}
                    className="mb-4"
                >
                    {alert.message}
                </Alert>
            </Fade>
        </div>
    );
};

export default LoginForm;
