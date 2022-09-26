import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as userService from '~/services/userService';

const usersSlice = createSlice({
    name: 'usersList',
    initialState: {
        status: 'idle',
        users: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.status = 'idle';
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const currentUserIndex = state.users.findIndex(
                    (user) => user._id === action.payload.id,
                );

                state.users[currentUserIndex] = action.payload;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(
                    (user) => user._id !== action.payload,
                );
            })
            .addCase(followUser.fulfilled, (state, action) => {
                const { followedUserID, currentUserID } = action.payload;
                const followedIndex = state.users.findIndex(
                    (user) => user._id === followedUserID,
                );
                const userIndex = state.users.findIndex(
                    (user) => user._id === currentUserID,
                );

                state.users[followedIndex].followerIDs.push(currentUserID);
                state.users[userIndex].followingIDs.push(currentUserID);
            })
            .addCase(unfollowUser.fulfilled, (state, action) => {
                const { unfollowedUserID, currentUserID } = action.payload;
                const unfollowedIndex = state.users.findIndex(
                    (user) => user._id === unfollowedUserID,
                );

                const userIndex = state.users.findIndex(
                    (user) => user._id === currentUserID,
                );

                state.users[unfollowedIndex].followerIDs = state.users[
                    unfollowedIndex
                ].followerIDs.filter((id) => id !== currentUserID);

                state.users[userIndex].followingIDs = state.users[
                    userIndex
                ].followingIDs.filter((id) => id !== currentUserID);
            });
    },
});

export const getUsers = createAsyncThunk('usersList/getUsers', async () => {
    const data = await userService.get();
    return data;
});

export const createUser = createAsyncThunk('userList/addUser', async (user) => {
    const newUser = await userService.post(user);
    return newUser;
});

export const updateUser = createAsyncThunk(
    'userList/updateUser',
    async ({ _id, updatedData }) => {
        const data = await userService.put(_id, updatedData);
        console.log(data);
        return data;
    },
);

export const deleteUser = createAsyncThunk(
    'userList/deleteUser',
    async (userID) => {
        const data = await userService.remove(userID);
        return data;
    },
);

export const followUser = createAsyncThunk(
    'userList/followUser',
    async (userID) => {
        const data = await userService.follow(userID);
        return data;
    },
);

export const unfollowUser = createAsyncThunk(
    'userList/unfollowUser',
    async (userID) => {
        const data = await userService.unfollow(userID);
        return data;
    },
);

export default usersSlice;
