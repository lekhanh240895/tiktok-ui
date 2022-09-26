import Following from '~/pages/Folllowing/Following';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import HeaderOnlyLayout from '~/layouts/HeaderOnlyLayout';
import Search from '~/pages/Search';
import config from '~/config';
import Live from '~/pages/Live';
import Feedback from '~/pages/Feedback';
import Music from '~/pages/Music';
import Tag from '~/pages/Tag';
import SharedLayout from '~/layouts/SharedLayout';
import NotFound from '~/pages/NotFound';

const publicRoutes = [
    {
        path: config.routes.notFound,
        component: NotFound,
        layout: HeaderOnlyLayout,
    },
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.following,
        component: Following,
    },
    {
        path: config.routes.profile,
        component: Profile,
        layout: SharedLayout,
    },
    {
        path: config.routes.search,
        component: Search,
    },
    {
        path: config.routes.live,
        component: Live,
        layout: SharedLayout,
    },
    {
        path: config.routes.feedback,
        component: Feedback,
    },
    {
        path: config.routes.tag,
        component: Tag,
        layout: SharedLayout,
    },
    {
        path: config.routes.music,
        component: Music,
        layout: SharedLayout,
    },
    {
        path: config.routes.upload,
        component: Upload,
        layout: HeaderOnlyLayout,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
