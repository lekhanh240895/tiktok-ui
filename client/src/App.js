import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
import { getVideos } from './redux/slices/videosSlice';
import LoginModal from './components/modals/LoginModal';
import PrivateOutlet from './components/PrivateRouteOutlet';
import { getMe } from './redux/slices/authSlice';

function App() {
    const { videos } = useSelector(videosSelector);
    const { isEditModalShow } = useSelector(editModalSelector);
    const { isLoginModalShow } = useSelector(loginModalSelector);
    const dispatch = useDispatch();

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
        const token = localStorage.getItem('token');
        // Fetch Users
        dispatch(getUsers());

        // Fetch Videos
        dispatch(getVideos());

        // Get currentUser
        if (token) dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            const tags = videos.reduce((cur, video) => {
                return cur.concat(video.tags.map((tag) => tag));
            }, []);

            const filterTags = unique(tags);
            const musics = videos.reduce((cur, video) => {
                return cur.includes(video.music) ? cur : [...cur, video.music];
            }, []);

            dispatch(appSlice.actions.setTags(filterTags));
            dispatch(appSlice.actions.setMusics(musics));
        })();
    }, [dispatch, videos]);

    return (
        <div className="App">
            <Router>
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
                </Routes>

                <GetAppButton />
                {isEditModalShow && <EditProfileModal />}
                {isLoginModalShow && <LoginModal />}
            </Router>
        </div>
    );
}

export default App;
