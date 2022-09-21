import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const usersSlice = createSlice({
    name: 'usersList',
    initialState: {
        status: 'idle',
        users: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.status = 'idle';
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const currentUserIndex = state.users.findIndex(
                    (user) => user.id === action.payload.id,
                );

                state.users[currentUserIndex] = action.payload;
            });
    },
});

export const fetchUsers = createAsyncThunk('usersList/fetchUsers', async () => {
    const res = await axios.get(`http://localhost:3004/users`);
    const users = res.data;
    return users;
});

export const createUser = createAsyncThunk('userList/addUser', async (user) => {
    const res = await axios.post(`http://localhost:3004/users`, user);
    const newUser = res.data;
    return newUser;
});

export const updateUser = createAsyncThunk(
    'userList/updateUser',
    async (updatedUser) => {
        const config = {
            method: 'post',
            url: 'http://localhost:3004/users/update',
            data: updatedUser,
        };

        const res = await axios(config);

        return res.data;
    },
);

export default usersSlice;
