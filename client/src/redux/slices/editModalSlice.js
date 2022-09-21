import { createSlice } from '@reduxjs/toolkit';

const editModalSlice = createSlice({
    name: 'editModal',
    initialState: {
        isShow: false,
    },
    reducers: {
        showEditModal: (state, action) => {
            state.isShow = true;
        },
        hideEditModal: (state, action) => {
            state.isShow = false;
        },
    },
});

export default editModalSlice;
