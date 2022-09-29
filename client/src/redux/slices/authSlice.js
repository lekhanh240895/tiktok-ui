import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as authService from '~/services/authService';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
    },
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        reset: (state) => {
            state.currentUser = null;
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentUser = action.payload;
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.currentUser = null;
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentUser = action.payload;
            })
            .addCase(register.rejected, (state) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.currentUser = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.currentUser = null;
            })
            .addCase(getMe.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentUser = action.payload;
            })
            .addCase(getMe.rejected, (state) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.currentUser = null;
            });
    },
});

// Register User
export const register = createAsyncThunk('auth/register', async (data) => {
    const user = await authService.register(data);
    return user;
});

// JWT Login
export const getMe = createAsyncThunk('auth/getMe', async () => {
    const user = await authService.getMe();
    return user;
});

// Login
export const login = createAsyncThunk('auth/login', async (data) => {
    const user = await authService.login(data);
    return user;
});

// Logout
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout();
});

export default authSlice;
