import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true,
});

export async function register({ username, email, password }) {
    try {
        const response = await api.post("/register", {
            username,
            email,
            password,
        });

        return response.data;
    } catch (err) {
        console.error(
            "Register Error:",
            err.response?.data || err.message
        );

        throw err;
    }
}

export async function login({ email, password }) {
    try {
        const response = await api.post("/login", {
            email,
            password,
        });

        return response.data;
    } catch (err) {
        console.error(
            "Login Error:",
            err.response?.data || err.message
        );

        throw err;
    }
}

export async function logout() {
    try {
        const response = await api.get("/logout");
        return response.data;
    } catch (err) {
        console.error(
            "Logout Error:",
            err.response?.data || err.message
        );

        throw err;
    }
}

export async function getMe() {
    try {
        const response = await api.get("/get-me");
        return response.data;
    } catch (err) {
        console.error(
            "Get Me Error:",
            err.response?.data || err.message
        );

        throw err;
    }
}