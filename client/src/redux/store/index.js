import { configureStore } from '@reduxjs/toolkit';
import videosSlice from '../slices/videosSlice';

const store = configureStore({
    reducer: {
        videos: videosSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
});

export default store;
