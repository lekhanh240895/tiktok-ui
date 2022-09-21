import { configureStore } from '@reduxjs/toolkit';
import videosSlice from './slices/videosSlice';
import usersSlice from './slices/usersSlice';
import editModalSlice from './slices/editModalSlice';
import appSlice from './slices/appSlice';

const store = configureStore({
    reducer: {
        videos: videosSlice.reducer,
        users: usersSlice.reducer,
        editModal: editModalSlice.reducer,
        app: appSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
});

export default store;
