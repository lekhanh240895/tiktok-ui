import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as videoService from '~/services/videoService';

const videosSlice = createSlice({
    name: 'videos',
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        videos: [],
    },
    reducers: {
        addComment: (state, action) => {
            const videoIndex = state.videos.findIndex(
                (video) => video._id === action.payload.videoID,
            );
            state.videos[videoIndex].comments.push(action.payload.newComment);
        },
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.videos = [];
        },
        resetStatus: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getVideos.pending, (state, action) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(getVideos.fulfilled, (state, action) => {
                state.videos = action.payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(getVideos.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.videos = null;
            })
            .addCase(createVideo.pending, (state, action) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(createVideo.fulfilled, (state, action) => {
                state.videos.push(action.payload);
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(createVideo.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
            })
            .addCase(updateVideo.fulfilled, (state, action) => {
                const videoIndex = state.videos.findIndex(
                    (video) => video._id === action.payload._id,
                );
                state.videos[videoIndex] = action.payload;
                console.log('VIDEO', action.payload);
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
    async (video, { getState }) => {
        const respone = await videoService.create(video);
        const users = getState().users.users;
        const user = users.find((user) => user._id === respone.user);

        const newVideo = {
            ...respone,
            user,
        };

        return newVideo;
    },
);

export const likeVideo = createAsyncThunk('videoList/like', async (videoID) => {
    const newVideo = await videoService.like(videoID);
    return newVideo;
});

export const updateVideo = createAsyncThunk(
    'videoList/updateVideo',
    async (updatedVideo) => {
        const newVideo = await videoService.update(updatedVideo);
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
