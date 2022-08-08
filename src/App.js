import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes } from '~/routes/index';
import DefaultLayout from '~/layouts/DefaultLayout';
import { useAppContext } from '~/store/AppContext';
import * as userService from '~/services/userService';
import * as actions from '~/store/actions';
import GetAppButton from './components/BottomContainer/BottomContainer';

function App() {
    const [{ currentUserID, videos }, dispatch] = useAppContext();

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
            const users = await userService.get();
            dispatch(actions.fetchUsers(users));

            const currentUser = users.find((user) => user.id === currentUserID);
            dispatch(actions.setCurrentUser(currentUser));

            const tags = videos.reduce((cur, video) => {
                return cur.concat(video.tags.map((tag) => tag));
            }, []);

            const filterTags = unique(tags);

            const musics = videos.reduce((cur, video) => {
                return cur.includes(video.music) ? cur : [...cur, video.music];
            }, []);

            dispatch(actions.setTags(filterTags));
            dispatch(actions.setMusics(musics));
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUserID]);

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
            </div>
        </Router>
    );
}

export default App;
