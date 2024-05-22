import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        if (token && storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to parse stored user:", error);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
        }
    }, []);

    const login = async (username, password) => {
        const data = await authService.login(username, password);
        if (data.error) {
            return data;
        } else {
            setUser(data.user);
            localStorage.setItem("token", data.access);
            localStorage.setItem("refreshToken", data.refresh);
            localStorage.setItem("user", JSON.stringify(data.user));
        }
        return data;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const register = async (username, email, password) => {
        const data = await authService.register(username, email, password);
        return data;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
