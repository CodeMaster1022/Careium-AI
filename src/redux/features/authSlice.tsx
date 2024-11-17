import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from 'lucide-react';

// Define the initial state using an interface
interface User {
    status: string;
    message: string;
}
interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

// Define initial state
const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

// Async thunk for user registration


// Async thunk for user login
export const loginByMacAddress = createAsyncThunk(
    'auth/login',
    async (credentials: { macAddress: string; }, { rejectWithValue }) => {
        try {
            const { macAddress } = credentials;
            const url = `https://billing.lol/private/app.php?reseller=0&mac=${macAddress}`;
            const response = await axios.post(url);
            
            localStorage.setItem("user", JSON.stringify(response.data?.status));
            return response.data; // Assuming the response contains user data and token
        } catch (error) {
            console.error("Login error:", error);
            return rejectWithValue(error);
        }
    }
);
export const loginByLogin = createAsyncThunk(
    'auth/loginByLogin',
    async (credentials: { username: string; password: string; role: number; }, { rejectWithValue }) => {
        try {
            console.log(credentials.role,"----------");
            const { username, password, role } = credentials;
            const url = `https://billing.lol/private/app.php?reseller=1&username=${username}&password=${password}`;
            console.log(url, role)
            const response = await axios.post(url);
            console.log(response.data)
            return response.data; // Assuming the response contains user data and token
        } catch (error) {
            console.error("Login error:", error);
            return rejectWithValue(error);
        }
    }
);
export const loginByUsername = createAsyncThunk(
    'auth/loginByUsername',
    async (credentials: { username: string; password: string; role: number; }, { rejectWithValue }) => {
        try {
            
            const { username, password, role } = credentials;
            console.log(role,"----------");
            const url = `https://billing.lol/private/app.php?reseller=0&login=${username}&password=${password}`;
            
            const response = await axios.post(url);
            console.log(response.data)
            return response.data; // Assuming the response contains user data and token
        } catch (error) {
            console.error("Login error:", error);
            return rejectWithValue(error);
        }
    }
);
// Create the auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByMacAddress.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginByMacAddress.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload; // Save user data on successful login
            })
            .addCase(loginByMacAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Handle error during login
            })
            .addCase(loginByUsername.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginByUsername.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload; // Save user data on successful login
            })
            .addCase(loginByUsername.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Handle error during login
            })
            .addCase(loginByLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginByLogin.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload; // Save user data on successful login
            })
            .addCase(loginByLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Handle error during login
            })

    },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;