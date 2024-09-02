import axios from "axios";

export const api = axios.create({
    baseURL: "https://pctrn-3u5lpwav5-rafi-abdurrahman-abqoris-projects.vercel.app/"
});

export const setAuthToken = (token?: string) => {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
}