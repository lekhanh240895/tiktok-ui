import classnames from 'classnames/bind';
import { useSelector } from 'react-redux';
import VideoList from '~/components/VideoList';
import { authSelector, videosSelector } from '~/redux/selectors';
import styles from './Home.module.scss';

const cx = classnames.bind(styles);

export default function Home() {
    const { videos } = useSelector(videosSelector);
    const { currentUser } = useSelector(authSelector);
    const fypVideos = videos?.filter(
        (video) => video.user?._id !== currentUser?._id,
    );
    const sortVideos = fypVideos?.sort((a, b) => b.views - a.views);
    return (
        <div className={cx('wrapper')}>
            <VideoList videos={sortVideos} />
        </div>
    );
}
