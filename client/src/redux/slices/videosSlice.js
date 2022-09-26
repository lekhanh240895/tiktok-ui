import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const videosSlice = createSlice({
    name: 'videos',
    initialState: {
        status: 'idle',
        videos: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getVideos.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getVideos.fulfilled, (state, action) => {
                state.videos = action.payload;
                state.status = 'idle';
            })
            .addCase(createVideo.fulfilled, (state, action) => {
                state.videos.push(action.payload);
            })

            .addCase(updateVideo.fulfilled, (state, action) => {
                const videoIndex = state.videos.findIndex(
                    (video) => video._id === action.payload._id,
                );
                state.videos[videoIndex] = action.payload;
            })
            .addCase(deleteVideo.fulfilled, (state, action) => {
                state.videos = state.videos.filter(
                    (video) => video._id !== action.payload.videoID,
                );
            });
    },
});

export const getVideos = createAsyncThunk('videosList/getVideos', async () => {
    const res = await axios.get(`http://localhost:3004/videos`);
    const videos = res.data;
    return videos;
});

export const createVideo = createAsyncThunk(
    'videoList/createVideo',
    async (video) => {
        const res = await axios.post(`http://localhost:3004/videos`, video);
        const newVideo = res.data;
        return newVideo;
    },
);

export const updateVideo = createAsyncThunk(
    'videoList/updateVideo',
    async ({ id, updatedVideo }) => {
        const token = localStorage.getItem('token');
        const config = {
            method: 'put',
            url: `http://localhost:3004/videos/${id}/update`,
            data: updatedVideo,
            headers: {
                Authorization: 'Bearer ' + token,
            },
        };

        const res = await axios(config);
        return res.data;
    },
);

export const deleteVideo = createAsyncThunk(
    'videoList/deleteVideo',
    async (videoID) => {
        const config = {
            method: 'delete',
            url: 'http://localhost:3004/videos/delete',
            data: videoID,
        };

        const res = await axios(config);

        return res.data;
    },
    {},
);

export default videosSlice;
