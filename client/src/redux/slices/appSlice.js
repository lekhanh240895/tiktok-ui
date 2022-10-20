import { createSlice } from '@reduxjs/toolkit';

const settings = JSON.parse(localStorage.getItem('userSettings'));

const appSlice = createSlice({
    name: 'app',
    initialState: {
        mousePosition: {},
        selectedVideoId: null,
        selectedUserID: null,
        selectedConversationID: null,
        tags: [],
        musics: [],
        settings: settings || {
            isMuted: true,
            volume: 1,
        },
        socket: null,
        onlineUsers: [],
    },
    reducers: {
        setSocket: (state, action) => {
            state.socket = action.payload;
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        setSelectedVideoId: (state, action) => {
            state.selectedVideoId = action.payload;
        },
        setSelectedConversationID: (state, action) => {
            state.selectedConversationID = action.payload;
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
        setSettings: (state, action) => {
            state.settings = action.payload;
        },
    },
});

export default appSlice;
