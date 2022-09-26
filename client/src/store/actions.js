import {
    FETCH_USERS,
    SET_CURRENT_USER,
    LIKE_VIDEO,
    SET_SELECTED_VIDEO_ID,
    SET_SELECTED_USER_ID,
    SET_MOUSE_POSITION,
    SET_TAGS,
    SET_MUSICS,
    FOLLOW_USER,
    UNFOLLOW_USER,
    OPEN_EDIT_MODAL,
    UPDATE_PROFILE,
} from './constants';

export const getUsers = (payload) => ({
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

export const setSelectedUserID = (payload) => ({
    type: SET_SELECTED_USER_ID,
    payload,
});

export const setMousePosition = (payload) => ({
    type: SET_MOUSE_POSITION,
    payload,
});

export const setTags = (payload) => ({
    type: SET_TAGS,
    payload,
});

export const setMusics = (payload) => ({
    type: SET_MUSICS,
    payload,
});

export const followUser = (payload) => ({
    type: FOLLOW_USER,
    payload,
});
export const unFollowUser = (payload) => ({
    type: UNFOLLOW_USER,
    payload,
});
export const openEditModal = (payload) => ({
    type: OPEN_EDIT_MODAL,
    payload,
});
export const updateProfile = (payload) => ({
    type: UPDATE_PROFILE,
    payload,
});
