import axios from "axios";

export const apiClient = axios.create(
    {
        baseURL: 'https://taskmanager-backend-y46m.onrender.com'
    }
)
