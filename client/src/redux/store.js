import { configureStore } from '@reduxjs/toolkit';
import videosSlice from './slices/videosSlice';
import usersSlice from './slices/usersSlice';
import appSlice from './slices/appSlice';
import loginModalSlice from './slices/loginModalSlice';
import editModalSlice from './slices/editModalSlice';
import authSlice from './slices/authSlice';

const store = configureStore({
    reducer: {
        videos: videosSlice.reducer,
        users: usersSlice.reducer,
        editModal: editModalSlice.reducer,
        loginModal: loginModalSlice.reducer,
        app: appSlice.reducer,
        auth: authSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
});

export default store;
