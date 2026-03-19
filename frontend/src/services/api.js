import axios from 'axios'
import store from '../store/store' // Import Redux store directly!

const api = axios.create({
    baseURL: "http://127.0.0.1:8001/api/v1",
    headers: { 'Content-Type': 'application/json' }
})

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        // Grab the current token from Redux state
        const token = store.getState().auth.accessToken;
        
        // If we have a token, attach it!
        // If it's Login or Register, we don't have a token yet, so this gets skipped automatically.
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api