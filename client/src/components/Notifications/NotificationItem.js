import Avatar from '../Avatar';
import Button from '../Button';
import { CheckedIcon, TwoWayArrow } from '../Icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { appSelector, authSelector } from '~/redux/selectors';
import { useEffect, useState } from 'react';
import authSlice from '~/redux/slices/authSlice';
import { followUser, unfollowUser } from '~/redux/slices/usersSlice';
import formatDateAgo from '~/services/formatDateAgo';
import * as notificationService from '~/services/notificationService';

export default function NotificationItem({ notif }) {
    const { currentUser } = useSelector(authSelector);
    const { socket } = useSelector(appSelector);
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsFollowed(currentUser?.followings.includes(notif.sender._id));
    }, [currentUser, notif]);

    const handleFollow = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const updatedUser = {
            ...currentUser,
            followings: currentUser?.followings.concat(notif.sender._id),
        };
        dispatch(authSlice.actions.setCurrentUser(updatedUser));
        dispatch(followUser(notif.sender._id));

        const data = {
            receiver: notif.sender._id,
            type: 'follow',
            sender: currentUser,
        };

        socket.emit('sendNotification', data);

        if (data.receiver !== data.sender._id) {
            await notificationService.create({
                ...data,
                createdAt: new Date(),
            });
        }
    };

    const handleUnfollow = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const updatedUser = {
            ...currentUser,
            followings: currentUser.followings.filter(
                (id) => id !== notif.sender._id,
            ),
        };
        dispatch(authSlice.actions.setCurrentUser(updatedUser));
        dispatch(unfollowUser(notif.sender._id));
    };

    const renderAction = (type) => {
        switch (type) {
            case 'follow':
                return <span>Follows you.</span>;
            case 'like':
                if (notif.subType === 'like-comment')
                    return <span>liked your comment.</span>;
                return <span>liked your video.</span>;
            case 'comment':
                return <span>commented: {notif.comment.text}</span>;
            case 'mention':
                if (notif.subType === 'mention-comment')
                    return (
                        <span>
                            mentioned you in a comment: {notif.comment.text}
                        </span>
                    );
                return <span>mentioned you in a video.</span>;
            default:
                return;
        }
    };

    let Comp;
    let props = {};
    if (notif.video) {
        Comp = Link;
        props.to = `/@${notif.sender.username}/video/${notif.video?._id}`;
    } else if (notif.type === 'follow') {
        Comp = Link;
        props.to = `/@${notif.sender.username}`;
    } else {
        Comp = 'div';
    }

    return (
        <li>
            <Comp {...props} className="notification-item">
                <Avatar
                    src={notif.sender.avatar}
                    width="4.8rem"
                    height="4.8rem"
                />
                <div className="notification-content">
                    <h4 className="notification-content_username">
                        {notif.sender.username}
                        <span className="icon-wrapper">
                            <CheckedIcon
                                className="check"
                                width="1.4rem"
                                height="1.4rem"
                            />
                        </span>
                    </h4>
                    <p className="notification-desc">
                        {renderAction(notif.type)}
                        <span className="notification-time">
                            {formatDateAgo(notif.createdAt)}
                        </span>
                        {notif.subType === 'like-comment' && (
                            <span className="notification-desc__comment">{`${notif.comment?.user.username}: ${notif.comment?.text}`}</span>
                        )}
                    </p>
                </div>
                {notif.type === 'follow' ? (
                    isFollowed ? (
                        <Button
                            secondary
                            className="notification-follow-btn"
                            onClick={handleUnfollow}
                            leftIcon={
                                <TwoWayArrow width="1.4rem" height="1.4rem" />
                            }
                        >
                            Friends
                        </Button>
                    ) : (
                        <Button
                            primary
                            className="notification-follow-btn"
                            onClick={handleFollow}
                        >
                            Follow back
                        </Button>
                    )
                ) : (
                    <div
                        className="video-cover"
                        style={{
                            backgroundImage: `url(${notif.video?.cover})`,
                        }}
                    ></div>
                )}
            </Comp>
        </li>
    );
}
