import {
    FETCH_USERS,
    SET_CURRENT_USER,
    LIKE_VIDEO,
    SET_SELECTED_VIDEO_ID,
} from './constants';

export const fetchUsers = (payload) => ({
    type: FETCH_USERS,
    payload,
});

export const setCurrentUser = (payload) => ({
    type: SET_CURRENT_USER,
    payload,
});

export const likeVideo = (payload) => ({
    type: LIKE_VIDEO,
    payload,
});

export const setSelectedVideoId = (payload) => ({
    type: SET_SELECTED_VIDEO_ID,
    payload,
});
