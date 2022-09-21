import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes } from '~/routes/index';
import DefaultLayout from '~/layouts/DefaultLayout';
import GetAppButton from './components/BottomContainer/BottomContainer';
import EditProfileModal from './components/modals/EditProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import {
    appSelector,
    editModalSelector,
    usersSelector,
    videosSelector,
} from './redux/selectors';
import { fetchUsers } from './redux/slices/usersSlice';
import appSlice from './redux/slices/appSlice';

function App() {
    const videos = useSelector(videosSelector);
    const { currentUserID } = useSelector(appSelector);
    const userList = useSelector(usersSelector);
    const { isShow } = useSelector(editModalSelector);
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
        // Fetch Users
        dispatch(fetchUsers());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const currentUser = userList.users.find(
            (user) => user.id === currentUserID,
        );
        dispatch(appSlice.actions.setCurrentUser(currentUser));
    }, [currentUserID, dispatch, userList]);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videos]);

    return (
        <Router>
            <div className="App">
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
                </Routes>
                <GetAppButton />
                {isShow && <EditProfileModal />}
            </div>
        </Router>
    );
}

export default App;
