import videos from '~/assets/videos';
import {
    FETCH_USERS,
    SET_CURRENT_USER,
    LIKE_VIDEO,
    SET_SELECTED_USER_ID,
    SET_MOUSE_POSITION,
    SET_TAGS,
    SET_MUSICS,
} from '~/store/constants';

function between(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export const initialState = {
    currentUserID: 8,
    currentUser: {},
    mousePosition: {},
    users: [],
    selectedVideoId: null,
    selectedUserId: null,
    videos: [
        {
            id: 1,
            userId: 8,
            title: 'Mọi người có đồng ý không? Cãi sao được mà cãi haha #anhsedoi #emhatainghe #phaohong #remix #nhachayminmin #xuhuong',
            src: videos.video5,
            likes: [1, 4, 3, 5, 9, 8, ...new Array(between(100, 1000000))],
            shares: [1, 4, 3, ...new Array(between(1, 10000))],
            comments: 121,
            music: 'Anh Sẽ Đợi Remix - Air Media & Tô Minh & TLong',
            tags: [
                'korean songs',
                'ca koi',
                'hoa',
                'hoavinhh',
                'cay canh viet',
            ],
            views: between(1, 1000000000),
        },
        {
            id: 2,
            userId: 8,
            title: 'Nghe nó cứ đã và sang sao á. Không thể nào sai được #lacchonhongtran #itnhungdailau #khongbang #remix #nhachayminmin',
            src: videos.video6,
            likes: [1, 4, 3, 2, 6, ...new Array(between(100, 1000000))],
            shares: [1, 4, 3, ...new Array(between(1, 10000))],
            comments: 1123,
            music: 'Thuyền Quyền x AM Ri mic - nhac cua bet ♪',
            tags: ['korean songs', 'ca koi', 'hoa hướng dương'],
            views: between(1, 1000000000),
        },
        {
            id: 3,
            userId: 1,
            title: 'Sao đến tận bây giờ tôi mới nghe bài này cơ chứ. Quá hay #themtungphutgiay #kayn #umie #nhachayminmin',
            src: videos.video7,
            likes: [1, 4, 3, ...new Array(between(100, 1000000))],
            shares: [1, 4, 3, 8, ...new Array(between(1, 10000))],
            comments: 1134,
            music: 'Anh Sẽ Đợi Remix - Air Media & Tô Minh & TLong',
            tags: ['korean songs', 'ca koi'],
            views: between(1, 1000000000),
        },
        {
            id: 4,
            userId: 6,
            title: 'Mọi người có đồng ý không? Cãi sao được mà cãi haha #anhsedoi #emhatainghe #phaohong #remix #nhachayminmin #xuhuong',
            src: videos.video4,
            likes: [1, 4, 3, ...new Array(between(100, 1000000))],
            shares: [1, 4, 3, ...new Array(between(1, 10000))],
            comments: 1134,
            music: 'Anh Sẽ Đợi Remix - Air Media & Tô Minh & TLong',
            tags: ['korean songs', 'ca koi', 'korean girls'],
            views: between(1, 1000000000),
        },
        {
            id: 5,
            userId: 4,
            title: 'Không cãi được. Đoạn gẩy guitar cuốn bay bản gốc liền luôn #thuyenquyen #dieukien #remix #nhachayminmin #xuhuong',
            src: videos.video3,
            likes: [1, 4, 3, 8, ...new Array(between(100, 1000000))],
            shares: [1, 4, 3, 8, ...new Array(between(1, 10000))],
            comments: 1134,
            music: 'Thuyền Quyền x AM Ri mic - nhac cua bet ♪',
            tags: ['korean songs', 'ca koi', 'korean girls'],
            views: between(1, 1000000000),
        },
        {
            id: 6,
            userId: 3,
            title: 'Chối cãi sao được nữa. Quá đúng luôn. Trùm cuối đỉnh thật.',
            src: videos.video1,
            likes: [1, 4, 3, 8, ...new Array(between(100, 1000000))],
            shares: [1, 4, 3, 8, ...new Array(between(1, 10000))],
            comments: 1134,
            music: 'nhạc nền - Gia Huy Singer 92',
            tags: ['korean songs', 'ca koi', 'korean girls'],
            views: between(1, 1000000000),
        },
        {
            id: 7,
            userId: 7,
            title: 'Chính xác là 11 bài. Quá đình không ai sánh bằng #nal #nhachayminmin #dangdo #roitoiluon #ngoinhavadongrom #xuhuong        ',
            src: videos.video2,
            likes: [1, 4, 3, 8, ...new Array(between(100, 1000000))],
            shares: [1, 4, 3, 8, ...new Array(between(1, 10000))],
            comments: 11,
            music: 'nhạc nền - 🍉Min Min🍉',
            tags: ['korean songs', 'ca koi', 'korean girls'],
            views: between(1, 1000000000),
        },
        {
            id: 8,
            userId: 5,
            title: 'Bạn nào hôm qua đang đi tự dưng bị quạt rơi trúng thì cho mình xin lỗi nhé 😂 #anhsedoi #fandance #dcgr',
            src: videos.video8,
            likes: [1, 4, 3, 5, 9, 8, ...new Array(between(100, 1000000))],
            shares: [1, 4, 3, ...new Array(between(1, 10000))],
            comments: 121,
            music: 'Anh Sẽ Đợi Remix - Air Media & Tô Minh & TLong',
            tags: ['korean songs', 'hoa', 'hoavinhh', 'cay canh viet'],
            views: between(1, 1000000000),
        },
        {
            id: 9,
            userId: 10,
            title: 'Muối ớt hay xào thì được mọi người ơi #phaohong #remix #nhachayminmin #xuhuong',
            src: videos.video9,
            likes: [1, 4, 3, 5, 9, 8, ...new Array(between(100, 1000000))],
            shares: [1, 4, 3, ...new Array(between(1, 10000))],
            comments: 121,
            music: 'Anh Sẽ Đợi Remix - Air Media & Tô Minh & TLong',
            tags: ['korean songs', 'hoavinhh', 'cay canh viet'],
            views: between(1, 1000000000),
        },
    ],
    tags: [],
    musics: [],
};

export default function reducer(state, action) {
    switch (action.type) {
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
        case LIKE_VIDEO:
            const newVideos = state.videos.map((video) => {
                return video.id === action.payload
                    ? {
                          ...video,
                          likes: video.likes.includes(state.currentUserID)
                              ? video.likes.filter(
                                    (id) => id !== state.currentUserID,
                                )
                              : [...video.likes, state.currentUserID],
                      }
                    : video;
            });

            return { ...state, videos: newVideos };
        default:
            return state;
    }
}
