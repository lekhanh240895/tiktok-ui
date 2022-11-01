import { Fragment, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { publicRoutes, privateRoutes } from '~/routes/index';
import DefaultLayout from '~/layouts/DefaultLayout';
import GetAppButton from './components/BottomContainer/BottomContainer';
import EditProfileModal from './components/modals/EditProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import {
    appSelector,
    authSelector,
    editModalSelector,
    loginModalSelector,
    videosSelector,
} from './redux/selectors';
import { getUsers } from './redux/slices/usersSlice';
import appSlice from './redux/slices/appSlice';
import videosSlice, { getVideos } from './redux/slices/videosSlice';
import LoginModal from './components/modals/LoginModal';
import PrivateOutlet from './components/PrivateRouteOutlet';
import { getMe } from './redux/slices/authSlice';
import Spinner from './components/Spinner/Spinner';
import { io } from 'socket.io-client';
import DeleteVideoModal from './components/modals/DeleteVideoModal';

function App() {
    const { isLoading, videos } = useSelector(videosSelector);
    const { isEditModalShow } = useSelector(editModalSelector);
    const { isLoginModalShow } = useSelector(loginModalSelector);
    const dispatch = useDispatch();
    const { currentUser } = useSelector(authSelector);
    const { socket, isDeleteModalShow } = useSelector(appSelector);
    const location = useLocation();

    useEffect(() => {
        const socket = io('https://tiktok-lekhanh-socket.herokuapp.com');
        dispatch(appSlice.actions.setSocket(socket));
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) socket?.emit('addUser', currentUser._id);
        socket?.on('getUsers', (users) => {
            dispatch(appSlice.actions.setOnlineUsers(users));
        });
    }, [socket, dispatch, currentUser]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        // Fetch users
        dispatch(getUsers());

        // Fetch videos
        dispatch(getVideos());

        if (token) dispatch(getMe());

        return () => {
            dispatch(videosSlice.actions.reset());
        };
    }, [dispatch]);

    function unique(arr) {
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
            if (!newArr.includes(arr[i])) {
                newArr.push(arr[i]);
            }
        }
        return newArr;
    }

    useEffect(() => {
        (async () => {
            if (videos?.length > 0) {
                const tags = videos.reduce((cur, video) => {
                    return cur.concat(video.tags?.map((tag) => tag));
                }, []);

                const filterTags = unique(tags);
                const musics = videos.reduce((cur, video) => {
                    return cur.includes(video.music)
                        ? cur
                        : [...cur, video.music];
                }, []);

                dispatch(appSlice.actions.setTags(filterTags));
                dispatch(appSlice.actions.setMusics(musics));
            }
        })();
    }, [dispatch, videos]);

    if (isLoading) return <Spinner />;

    return (
        <div className="App">
            {/* <Routes location={background || location}> */}
            <Routes>
                {publicRoutes.map((route, index) => {
                    let Layout = DefaultLayout;
                    const Page = route.component;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}

                {privateRoutes.map((route, index) => {
                    let Layout = DefaultLayout;
                    const Page = route.component;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }

                    return (
                        <Route
                            path={route.path}
                            key={index}
                            element={<PrivateOutlet />}
                        >
                            <Route
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        </Route>
                    );
                })}

                {/* <Route
                    path={`@:username/video/:videoID`}
                    element={<VideoModal />}
                /> */}
            </Routes>

            {/* {background && (
                <Routes>
                    <Route
                        path={`@:username/video/:videoID`}
                        element={<VideoModal />}
                    />
                </Routes>
            )} */}

            {location.pathname !== '/messages' && <GetAppButton />}
            {isEditModalShow && <EditProfileModal />}
            {isLoginModalShow && <LoginModal />}
            {isDeleteModalShow && <DeleteVideoModal />}
        </div>
    );
}

export default App;
