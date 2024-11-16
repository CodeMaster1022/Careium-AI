import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state using an interface
interface User {
    username: string;
    macAddress: string;
    password: string
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
            console.log("Requesting URL:", url);
            const response = await axios.post(url);
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
            });
    },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;