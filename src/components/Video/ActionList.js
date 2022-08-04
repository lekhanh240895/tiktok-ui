import { faComment, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames/bind';
import styles from './Video.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppContext } from '~/store/AppContext';
import * as actions from '~/store/actions';

const cx = classnames.bind(styles);

export default function ActionList({ data }) {
    const [{ currentUserID }, dispatch] = useAppContext();

    const numberConfig = (number) => {
        if (number >= 1000000) {
            const newNumber = (number / 1000000).toFixed(1);

            return newNumber + 'M';
        } else if ((number >= 1000) & (number < 1000000)) {
            const newNumber = (number / 1000).toFixed(1);

            return newNumber + 'K';
        } else {
            return number;
        }
    };

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
                        {numberConfig(data.likes.length)}
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
                        {numberConfig(data.comments.length)}
                    </span>
                </li>
                <li className={cx('action-item')}>
                    <span className={cx('action-item-btn')}>
                        <FontAwesomeIcon
                            icon={faShare}
                            style={{
                                width: '2.4rem',
                                height: '2.4rem',
                            }}
                        />
                    </span>
                    <span className={cx('video-stat')}>
                        {numberConfig(data.shares.length)}
                    </span>
                </li>
            </ul>
        </div>
    );
}
