import axios from "axios";


const api = axios.create({
    baseURL: "https://servicehive-back.onrender.com/api"
    });
api.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers = req.headers ?? {};
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default api;