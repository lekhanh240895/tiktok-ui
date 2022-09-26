import { createSlice } from '@reduxjs/toolkit';

const loginModalSlice = createSlice({
    name: 'loginModal',
    initialState: {
        isLoginModalShow: false,
    },
    reducers: {
        show: (state, action) => {
            state.isLoginModalShow = true;
        },
        hide: (state, action) => {
            state.isLoginModalShow = false;
        },
    },
});

export default loginModalSlice;
