import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames/bind';
import styles from './Video.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { configNumber } from '~/services';
import { ShareIcon } from '../Icons';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '~/redux/selectors';
import { likeVideo } from '~/redux/slices/videosSlice';
import loginModalSlice from '~/redux/slices/loginModalSlice';
import authSlice from '~/redux/slices/authSlice';
import { useState } from 'react';

const cx = classnames.bind(styles);

export default function ActionList({ video }) {
    const [likes, setLikes] = useState(video.likes.length);
    const { currentUser } = useSelector(authSelector);
    const [isLiked, setIsLiked] = useState(
        video.likes.includes(currentUser?._id),
    );

    const dispatch = useDispatch();

    const handleLike = (e) => {
        if (!currentUser) {
            return dispatch(loginModalSlice.actions.show());
        }

        if (isLiked) {
            const updatedUser = {
                ...currentUser,
                likedVideoIDs: currentUser.likedVideoIDs.filter(
                    (id) => id !== video._id,
                ),
            };

            dispatch(authSlice.actions.setCurrentUser(updatedUser));
        } else {
            const updatedUser = {
                ...currentUser,
                likedVideoIDs: currentUser.likedVideoIDs.concat(video._id),
            };

            dispatch(authSlice.actions.setCurrentUser(updatedUser));
        }

        dispatch(likeVideo(video._id));
        setIsLiked(!isLiked);
        setLikes(isLiked ? likes - 1 : likes + 1);
    };

    return (
        <div className={cx('actions')}>
            <ul className={cx('actions-list')}>
                <li className={cx('action-item')}>
                    <span
                        className={cx('action-item-btn')}
                        onClick={handleLike}
                        style={{ color: isLiked ? 'red' : 'initial' }}
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
                        {configNumber(likes)}
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
                        {configNumber(video.comments.length)}
                    </span>
                </li>
                <li className={cx('action-item')}>
                    <span className={cx('action-item-btn')}>
                        <ShareIcon width="2.4rem" height="2.4rem" />
                    </span>
                    <span className={cx('video-stat')}>
                        {configNumber(video.shares.length)}
                    </span>
                </li>
            </ul>
        </div>
    );
}
