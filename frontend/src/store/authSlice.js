import {createSlice} from '@reduxjs/toolkit'

// Helper to load state from Local Storage on page refresh
const loadState = () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (accessToken && refreshToken) {
            return { user, accessToken, refreshToken, isAuthenticated: true };
        }
    } catch (e) {
        console.warn("Failed to load auth state from local storage", e);
    }
    return { user: null, accessToken: null, refreshToken: null, isAuthenticated: false };
};

const initialState = loadState();

const auth= createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials : (state,action) => {
            state.user= action.payload.user;
            state.accessToken= action.payload.accessToken;
            state.refreshToken= action.payload.refreshToken;
            state.isAuthenticated= true;
            
            // Save to local storage!
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("accessToken", action.payload.accessToken);
            localStorage.setItem("refreshToken", action.payload.refreshToken);
        },
        logout: (state,action)=>{
            state.accessToken = null;
            state.user = null;
            state.refreshToken = null;
            state.isAuthenticated = false;

            // Clear local storage!
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        }
    }
})
export const { setCredentials, logout } = auth.actions;
export default auth.reducer;