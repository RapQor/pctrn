import axios from "axios";

export const api = axios.create({
    baseURL: "https://pctrn-be.vercel.app"
});

export const setAuthToken = (token?: string) => {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
}