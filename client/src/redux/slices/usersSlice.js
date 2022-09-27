import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as userService from '~/services/userService';

const usersSlice = createSlice({
    name: 'usersList',
    initialState: {
        status: 'idle',
        users: [],
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.status = 'idle';
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
                state.users[userIndex].followingIDs.push(followedUserID);
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
                ].followingIDs.filter((id) => id !== unfollowedUserID);
            });
    },
});

export const getUsers = createAsyncThunk('usersList/getUsers', async () => {
    const data = await userService.getUsers();
    return data;
});

export const updateUser = createAsyncThunk(
    'userList/updateUser',
    async ({ _id, updatedData }) => {
        const data = await userService.update(_id, updatedData);
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
