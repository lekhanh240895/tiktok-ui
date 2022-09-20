import { createSlice } from '@reduxjs/toolkit';
import videos from '~/assets/videos';

function between(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const videosSlice = createSlice({
    name: 'videos',
    initialState: [
        {
            id: 1,
            userId: 8,
            title: 'Mọi người có đồng ý không? Cãi sao được mà cãi haha #anhsedoi #emhatainghe #phaohong #remix #nhachayminmin #xuhuong',
            src: videos.video5,
            likes: [1, 4, 3, 5, 9, 8, ...new Array(between(100, 1000000))],
            shares: [1, 4, 3, ...new Array(between(1, 10000))],
            comments: new Array(between(1, 1000000)),
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
            userId: 2,
            title: 'Nghe nó cứ đã và sang sao á. Không thể nào sai được #lacchonhongtran #itnhungdailau #khongbang #remix #nhachayminmin',
            src: videos.video6,
            likes: [1, 4, 3, 2, 6, ...new Array(between(100, 1000000))],
            shares: [1, 4, 3, ...new Array(between(1, 10000))],
            comments: new Array(between(1, 1000000)),
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
            comments: new Array(between(1, 1000000)),
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
            comments: new Array(between(1, 1000000)),
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
            comments: new Array(between(1, 1000000)),
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
            comments: new Array(between(1, 1000000)),
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
            comments: new Array(between(1, 1000000)),
            music: 'Thuyền Quyền x AM Ri mic - nhac cua bet ♪',
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
            comments: new Array(between(1, 1000000)),
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
            comments: new Array(between(1, 1000000)),
            music: 'Anh Sẽ Đợi Remix - Air Media & Tô Minh & TLong',
            tags: ['korean songs', 'hoavinhh', 'cay canh viet'],
            views: between(1, 1000000000),
        },
    ],
    reducers: {
        likeVideo: (state, action) => {
            const selectedVideo = state.find(
                (video) => video.id === action.payload.id,
            );

            if (selectedVideo.likes.includes(action.payload.currentUserID)) {
                selectedVideo.likes = selectedVideo.likes.filter(
                    (id) => id !== action.payload.currentUserID,
                );
            } else {
                selectedVideo.likes.push(action.payload.currentUserID);
            }
        },
    },
});

export default videosSlice;
