import { faComment, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames/bind';
import styles from './Video.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classnames.bind(styles);

export default function ActionList({ data }) {
    return (
        <div className={cx('actions')}>
            <ul className={cx('actions-list')}>
                <li className={cx('action-item')}>
                    <span className={cx('action-item-btn')}>
                        <FontAwesomeIcon
                            icon={faHeart}
                            style={{
                                width: '2.4rem',
                                height: '2.4rem',
                            }}
                        />
                    </span>
                    <span className={cx('video-stat')}>{data.like}</span>
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
                    <span className={cx('video-stat')}>{data.comment}</span>
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
                    <span className={cx('video-stat')}>{data.share}</span>
                </li>
            </ul>
        </div>
    );
}
