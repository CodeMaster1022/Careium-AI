import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state using an interface
interface User {
    username: string;
    macaddress: string;
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
export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData: { username: string; macaddress: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/user/register', userData);
            return response.data; // Assuming the response contains user data
        } catch (error) {
            return rejectWithValue(error)
    }
    }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: { username: string; password: string }, { rejectWithValue }) => {
        try {
            console.log("==========>")
            const response = await axios.post('http://127.0.0.1:4000/login', credentials);
            return response.data; // Assuming the response contains user data and token
        } catch (error) {
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
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload; // Save user data on successful registration
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Handle error during registration
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload; // Save user data on successful login
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Handle error during login
            });
    },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;