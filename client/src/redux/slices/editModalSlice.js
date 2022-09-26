import { createSlice } from '@reduxjs/toolkit';

const editModalSlice = createSlice({
    name: 'editModal',
    initialState: {
        isEditModalShow: false,
    },
    reducers: {
        show: (state, action) => {
            state.isEditModalShow = true;
        },
        hide: (state, action) => {
            state.isEditModalShow = false;
        },
    },
});

export default editModalSlice;
