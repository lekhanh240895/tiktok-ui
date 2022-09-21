import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
    name: 'app',
    initialState: {
        currentUserID: 8,
        currentUser: {},
        mousePosition: {},
        users: [],
        selectedVideoId: null,
        selectedUserId: null,
        tags: [],
        musics: [],
        isEditModalShow: false,
    },
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        setSelectedVideoId: (state, action) => {
            state.selectedVideoId = action.payload;
        },
        setSelectedUserId: (state, action) => {
            state.selectedUserId = action.payload;
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
