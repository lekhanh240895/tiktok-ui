import { Fragment, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { publicRoutes, privateRoutes } from '~/routes/index';
import DefaultLayout from '~/layouts/DefaultLayout';
import GetAppButton from './components/BottomContainer/BottomContainer';
import EditProfileModal from './components/modals/EditProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import {
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
import VideoModal from './components/modals/VideoModal';

function App() {
    const { isLoading, isSuccess, videos } = useSelector(videosSelector);
    const { isEditModalShow } = useSelector(editModalSelector);
    const { isLoginModalShow } = useSelector(loginModalSelector);
    const dispatch = useDispatch();
    const location = useLocation();
    const background = location.state && location.state.background;

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
        if (isSuccess && videos.length > 0) {
            dispatch(videosSlice.actions.resetStatus());
        }
    }, [dispatch, isSuccess, videos]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        // Fetch Users
        dispatch(getUsers());

        // Fetch Videos
        dispatch(getVideos());

        // Get currentUser
        if (token) dispatch(getMe());

        return () => {
            dispatch(videosSlice.actions.reset());
        };
    }, [dispatch]);

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
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        </Route>
                    );
                })}

                <Route
                    path={`@:username/video/:videoID`}
                    element={<VideoModal />}
                />
            </Routes>

            {/* {background && (
                <Routes>
                    <Route
                        path={`@:username/video/:videoID`}
                        element={<VideoModal />}
                    />
                </Routes>
            )} */}

            <GetAppButton />
            {isEditModalShow && <EditProfileModal />}
            {isLoginModalShow && <LoginModal />}
        </div>
    );
}

export default App;
