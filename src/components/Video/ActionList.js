import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames/bind';
import styles from './Video.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppContext } from '~/store/AppContext';
import * as actions from '~/store/actions';
import { configNumber } from '~/services';
import { ShareIcon } from '../Icons';

const cx = classnames.bind(styles);

export default function ActionList({ data }) {
    const [{ currentUserID }, dispatch] = useAppContext();

    const isLikedByUser = data.likes.includes(currentUserID);

    const handleLike = () => {
        dispatch(actions.likeVideo(data.id));
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
