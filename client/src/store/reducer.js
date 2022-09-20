import {
    FETCH_USERS,
    SET_CURRENT_USER,
    SET_SELECTED_USER_ID,
    SET_MOUSE_POSITION,
    SET_TAGS,
    SET_MUSICS,
    FOLLOW_USER,
    UNFOLLOW_USER,
    OPEN_EDIT_MODAL,
    UPDATE_PROFILE,
} from '~/store/constants';

export const initialState = {
    currentUserID: 8,
    currentUser: {},
    mousePosition: {},
    users: [],
    selectedVideoId: null,
    selectedUserId: null,
    tags: [],
    musics: [],
    isEditModalShow: false,
};

export default function reducer(state, action) {
    switch (action.type) {
        case OPEN_EDIT_MODAL:
            return { ...state, isEditModalShow: action.payload };
        case FETCH_USERS:
            return { ...state, users: action.payload };
        case SET_TAGS:
            return { ...state, tags: action.payload };
        case SET_MUSICS:
            return { ...state, musics: action.payload };
        case SET_CURRENT_USER:
            return { ...state, currentUser: action.payload };
        case SET_SELECTED_USER_ID:
            return { ...state, selectedUserId: action.payload };
        case SET_MOUSE_POSITION:
            return { ...state, mousePosition: action.payload };
        case UPDATE_PROFILE:
            return { ...state, currentUser: action.payload };
        case FOLLOW_USER:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    followingIDs: !state.currentUser.followingIDs.includes(
                        action.payload,
                    )
                        ? [...state.currentUser.followingIDs, action.payload]
                        : state.currentUser.followingIDs,
                },
            };
        case UNFOLLOW_USER:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    followingIDs: state.currentUser.followingIDs.filter(
                        (id) => id !== action.payload,
                    ),
                },
            };

        default:
            return state;
    }
}
