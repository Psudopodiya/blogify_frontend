import axios from "axios";

const API_URL = "http://localhost:8000/api";

const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/token/`, {
            email: username,
            password: password,
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            return { error: error.response.data };
        }
        return { error: "Unexpected error occurred" };
    }
};

const register = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register/`, {
            username,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        } else {
            console.error("Register error", error);
        }
        return null;
    }
};

export default {
    login,
    register,
};
