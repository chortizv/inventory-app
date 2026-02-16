import axios from "axios";
import config from "../../config";

const axiosInstance = axios.create({
    baseURL: config.API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

export default axiosInstance;