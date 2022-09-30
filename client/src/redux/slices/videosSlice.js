import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as videoService from '~/services/videoService';

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
            })
            .addCase(likeVideo.fulfilled, (state, action) => {
                const updatedVideoIndex = state.videos.findIndex(
                    (video) => video.id === action.payload._id,
                );

                state.videos[updatedVideoIndex] = action.payload;
            });
    },
});

export const getVideos = createAsyncThunk('videosList/getVideos', async () => {
    const videos = await videoService.getVideos();
    return videos;
});

export const createVideo = createAsyncThunk(
    'videoList/createVideo',
    async (video) => {
        const newVideo = await videoService.create(video);
        return newVideo;
    },
);

export const likeVideo = createAsyncThunk('videoList/like', async (videoID) => {
    const newVideo = await videoService.like(videoID);
    return newVideo;
});

export const updateVideo = createAsyncThunk(
    'videoList/updateVideo',
    async ({ id, updatedVideo }) => {
        const newVideo = await videoService.update(id, updatedVideo);
        return newVideo;
    },
);

export const deleteVideo = createAsyncThunk(
    'videoList/deleteVideo',
    async (videoID) => {
        const deletedVideo = await videoService.remove(videoID);
        return deletedVideo;
    },
    {},
);

export default videosSlice;
