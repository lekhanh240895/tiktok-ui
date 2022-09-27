import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames/bind';
import styles from './Video.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { configNumber } from '~/services';
import { ShareIcon } from '../Icons';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, usersSelector } from '~/redux/selectors';
import { updateVideo } from '~/redux/slices/videosSlice';
import loginModalSlice from '~/redux/slices/loginModalSlice';
import usersSlice from '~/redux/slices/usersSlice';
import authSlice from '~/redux/slices/authSlice';

const cx = classnames.bind(styles);

export default function ActionList({ video }) {
    const { currentUser } = useSelector(authSelector);
    const { users } = useSelector(usersSelector);
    const dispatch = useDispatch();

    const isLikedByUser = video.likes.includes(currentUser?._id);

    const handleLike = (e) => {
        if (!currentUser) {
            dispatch(loginModalSlice.actions.show());
        } else {
            if (isLikedByUser) {
                const updatedVideo = {
                    ...video,
                    likes: video.likes.filter((id) => id !== currentUser?._id),
                };

                const updatedUser = {
                    ...currentUser,
                    likedVideoIDs: currentUser.likedVideoIDs.filter(
                        (id) => id !== video._id,
                    ),
                };

                const updatedUsers = users.map((user) => {
                    return user._id === currentUser._id
                        ? {
                              ...user,
                              likedVideoIDs: user.likedVideoIDs.filter(
                                  (id) => id !== video._id,
                              ),
                          }
                        : user;
                });

                dispatch(authSlice.actions.setCurrentUser(updatedUser));
                dispatch(usersSlice.actions.setUsers(updatedUsers));
                dispatch(updateVideo({ id: video._id, updatedVideo }));
            } else {
                const updatedVideo = {
                    ...video,
                    likes: video.likes.concat(currentUser?._id),
                };

                const updatedUser = {
                    ...currentUser,
                    likedVideoIDs: currentUser.likedVideoIDs.concat(video._id),
                };

                const updatedUsers = users.map((user) => {
                    return user._id === currentUser._id
                        ? {
                              ...user,
                              likedVideoIDs: user.likedVideoIDs.concat(
                                  video._id,
                              ),
                          }
                        : user;
                });
                dispatch(authSlice.actions.setCurrentUser(updatedUser));
                dispatch(usersSlice.actions.setUsers(updatedUsers));
                dispatch(updateVideo({ id: video._id, updatedVideo }));
            }
        }
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
                        {configNumber(video.likes.length)}
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
