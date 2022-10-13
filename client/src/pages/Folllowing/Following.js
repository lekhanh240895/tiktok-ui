import styles from './Following.module.scss';
import classnames from 'classnames/bind';
import VideoList from '~/components/VideoList';
import { useSelector } from 'react-redux';
import { authSelector, videosSelector } from '~/redux/selectors';

const cx = classnames.bind(styles);

export default function Following() {
    const { videos } = useSelector(videosSelector);
    const { currentUser } = useSelector(authSelector);
    const followingVideos = videos?.filter((video) =>
        currentUser?.followingIDs?.includes(video.user._id),
    );
    const getTime = (t) => new Date(t);
    const sortVideos = followingVideos?.sort(
        (a, b) => getTime(b.createdAt) - getTime(a.createdAt),
    );
    return (
        <div className={cx('wrapper')}>
            <VideoList videos={sortVideos} time />
        </div>
    );
}
