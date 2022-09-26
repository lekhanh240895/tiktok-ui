import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null,
    },
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(register.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                localStorage.setItem('token', action.payload.token);
            });
    },
});

export const login = createAsyncThunk('auth/login', async (data) => {
    const res = await axios.post('http://localhost:3004/auth/login', data);
    return res.data;
});

export const register = createAsyncThunk('auth/register', async (data) => {
    const res = await axios.post('http://localhost:3004/auth/register', data);
    return res.data;
});

export default authSlice;
