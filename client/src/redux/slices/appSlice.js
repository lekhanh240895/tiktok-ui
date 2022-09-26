import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
    name: 'app',
    initialState: {
        mousePosition: {},
        selectedVideoId: null,
        selectedUserID: null,
        tags: [],
        musics: [],
    },
    reducers: {
        setSelectedVideoId: (state, action) => {
            state.selectedVideoId = action.payload;
        },
        setSelectedUserID: (state, action) => {
            state.selectedUserID = action.payload;
        },
        setMousePosition: (state, action) => {
            state.mousePosition = action.payload;
        },
        setTags: (state, action) => {
            state.tags = action.payload;
        },
        setMusics: (state, action) => {
            state.musics = action.payload;
        },
    },
});

export default appSlice;
