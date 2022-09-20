import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames/bind';
import styles from './Video.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppContext } from '~/store/AppContext';
import { configNumber } from '~/services';
import { ShareIcon } from '../Icons';
import { useDispatch } from 'react-redux';
import videosSlice from '~/redux/slices/videosSlice';

const cx = classnames.bind(styles);

export default function ActionList({ data }) {
    const [{ currentUserID }] = useAppContext();
    const dispatch = useDispatch();

    const isLikedByUser = data.likes.includes(currentUserID);

    const handleLike = () => {
        dispatch(
            videosSlice.actions.likeVideo({
                id: data.id,
                currentUserID,
            }),
        );
    };

    return (
        <div className={cx('actions')}>
            <ul className={cx('actions-list')}>
                <li className={cx('action-item')}>
                    <span
                        className={cx('action-item-btn')}
                        onClick={handleLike}
                        style={{ color: isLikedByUser ? 'red' : 'initial' }}
                    >
                        <FontAwesomeIcon
                            icon={faHeart}
                            style={{
                                width: '2.4rem',
                                height: '2.4rem',
                            }}
                        />
                    </span>
                    <span className={cx('video-stat')}>
                        {configNumber(data.likes.length)}
                    </span>
                </li>
                <li className={cx('action-item')}>
                    <span className={cx('action-item-btn')}>
                        <FontAwesomeIcon
                            icon={faComment}
                            style={{
                                width: '2.4rem',
                                height: '2.4rem',
                            }}
                        />
                    </span>
                    <span className={cx('video-stat')}>
                        {configNumber(data.comments.length)}
                    </span>
                </li>
                <li className={cx('action-item')}>
                    <span className={cx('action-item-btn')}>
                        <ShareIcon width="2.4rem" height="2.4rem" />
                    </span>
                    <span className={cx('video-stat')}>
                        {configNumber(data.shares.length)}
                    </span>
                </li>
            </ul>
        </div>
    );
}
