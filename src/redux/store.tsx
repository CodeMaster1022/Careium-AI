import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import ticketReducer from './features/ticketSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        ticket: ticketReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;