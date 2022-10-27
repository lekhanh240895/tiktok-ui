import PropTypes from 'prop-types';
import styles from './UserProfile.module.scss';
import classnames from 'classnames/bind';

import Button from '~/components/Button';
import { CheckedIcon } from '~/components/Icons';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appSelector, authSelector } from '~/redux/selectors';
import { unfollowUser, followUser } from '~/redux/slices/usersSlice';
import loginModalSlice from '~/redux/slices/loginModalSlice';
import authSlice from '~/redux/slices/authSlice';
import * as notificationService from '~/services/notificationService';

const cx = classnames.bind(styles);

export const UserProfile = ({ user }) => {
    const { currentUser } = useSelector(authSelector);
    const { socket } = useSelector(appSelector);
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsFollowed(currentUser?.followings.includes(user._id));
    }, [currentUser, user]);

    const handleFollow = async () => {
        if (!currentUser) return dispatch(loginModalSlice.actions.show());
        const updatedUser = {
            ...currentUser,
            followings: currentUser.followings.concat(user._id),
        };
        dispatch(authSlice.actions.setCurrentUser(updatedUser));
        dispatch(followUser(user._id));

        const data = {
            receiver: user._id,
            type: 'follow',
            sender: currentUser,
        };

        socket.emit('sendNotification', data);

        await notificationService.create({
            ...data,
            createdAt: new Date(),
        });
    };

    const handleUnFollow = () => {
        if (!currentUser) return dispatch(loginModalSlice.actions.show());

        const updatedUser = {
            ...currentUser,
            followings: currentUser.followings.filter((id) => id !== user._id),
        };
        dispatch(authSlice.actions.setCurrentUser(updatedUser));
        dispatch(unfollowUser(user._id));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Link to={`/@${user.username}`} replace>
                    <Image
                        src={user.avatar}
                        alt={user.full_name}
                        className={cx('avatar')}
                    />
                </Link>

                {!isFollowed ? (
                    <Button
                        primary
                        className={cx('follow-btn')}
                        onClick={handleFollow}
                    >
                        Follow
                    </Button>
                ) : (
                    <Button
                        secondary
                        className={cx('follow-btn')}
                        onClick={handleUnFollow}
                    >
                        Following
                    </Button>
                )}
            </div>

            <div className={cx('info')}>
                <Link to={`/@${user.username}`} replace>
                    <h4 className={cx('name')}>
                        {user.full_name}
                        {user.tick && (
                            <CheckedIcon
                                width="1.4rem"
                                height="1.4rem"
                                style={{ marginLeft: '8px' }}
                            />
                        )}
                    </h4>
                </Link>

                <Link to={`/@${user.username}`} replace>
                    <p className={cx('desc')}>{user.username}</p>
                </Link>

                <p className={cx('user-stat')}>
                    <span>
                        <span className={cx('stat-number')}>9.6M</span>
                        <span className={cx('stat-desc')}> Followers</span>
                    </span>
                    <span>
                        <span className={cx('stat-number')}>22.7M</span>
                        <span className={cx('stat-desc')}> Likes</span>
                    </span>
                </p>
            </div>
        </div>
    );
};

UserProfile.propTypes = {
    user: PropTypes.object.isRequired,
};
export default UserProfile;
