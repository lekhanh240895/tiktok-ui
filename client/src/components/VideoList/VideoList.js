import { useEffect, useState } from 'react';
import styles from './VideoList.module.scss';
import classnames from 'classnames/bind';
import VideoItem from '~/components/VideoList/VideoItem';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { useElementOnScreen } from '~/hooks/useElementOnScreen';
import { useDispatch, useSelector } from 'react-redux';
import { appSelector, authSelector } from '~/redux/selectors';
import loginModalSlice from '~/redux/slices/loginModalSlice';
import { followUser, unfollowUser } from '~/redux/slices/usersSlice';
import authSlice from '~/redux/slices/authSlice';
import appSlice from '~/redux/slices/appSlice';
import * as notificationService from '~/services/notificationService';

const cx = classnames.bind(styles);

export default function VideoList({ videos, time }) {
    const setConfig = (settings) => {
        localStorage.setItem('userSettings', JSON.stringify(settings));
    };
    const dispatch = useDispatch();
    const { currentUser } = useSelector(authSelector);
    const [videoCount, setVideoCount] = useState(1);
    const [containerRef, isVisible] = useElementOnScreen({
        threshold: 0,
    });
    const { settings, socket } = useSelector(appSelector);

    useEffect(() => {
        if (isVisible) {
            if (videoCount < videos?.length)
                setVideoCount((prevState) => prevState + 1);
            else setVideoCount(videos?.length);
        }
    }, [isVisible, videoCount, videos]);

    const handleMuteVolume = () => {
        const newSettings = {
            ...settings,
            isMuted: !settings.isMuted,
        };
        dispatch(appSlice.actions.setSettings(newSettings));
        setConfig(newSettings);
    };

    const handleVolumeChange = (e) => {
        const newVolume = Number(e.target.value);
        const newSettings = {
            ...settings,
            volume: newVolume,
            isMuted: newVolume > 0 ? false : true,
        };
        dispatch(appSlice.actions.setSettings(newSettings));
        setConfig('volume', newVolume);
        setConfig(newSettings);
    };

    const handleFollow = async (_id) => {
        if (!currentUser) return dispatch(loginModalSlice.actions.show());
        const updatedUser = {
            ...currentUser,
            followingIDs: currentUser.followingIDs?.concat(_id),
        };
        dispatch(authSlice.actions.setCurrentUser(updatedUser));
        dispatch(followUser(_id));

        const data = {
            receiver: _id,
            type: 'follow',
            sender: currentUser,
        };

        socket.emit('sendNotification', data);

        await notificationService.create({
            ...data,
            createdAt: new Date(),
        });
    };

    const handleUnfollow = (_id) => {
        if (!currentUser) return dispatch(loginModalSlice.actions.show());
        const updatedUser = {
            ...currentUser,
            followingIDs: currentUser.followingIDs?.filter((id) => id !== _id),
        };
        dispatch(authSlice.actions.setCurrentUser(updatedUser));
        dispatch(unfollowUser(_id));
    };
    return (
        <>
            <ul className={cx('video-list')}>
                {videos?.slice(0, videoCount).map((video) => {
                    const isFollowed = currentUser?.followingIDs?.includes(
                        video.user?._id,
                    );
                    return (
                        <li key={video._id} className={cx('video-item')}>
                            <Link to={`/@${video.user?.username}`}>
                                <Image
                                    className={cx('avatar')}
                                    src={video.user?.avatar}
                                    alt="avatar"
                                />
                            </Link>

                            <VideoItem
                                video={video}
                                isMuted={settings.isMuted}
                                volume={settings.volume}
                                onMutedVolume={handleMuteVolume}
                                onVolumeChange={handleVolumeChange}
                                time={time}
                            />

                            {isFollowed ? (
                                <Button
                                    secondary
                                    small
                                    className={cx('follow-btn')}
                                    onClick={() =>
                                        handleUnfollow(video.user._id)
                                    }
                                >
                                    Following
                                </Button>
                            ) : (
                                <Button
                                    outline
                                    small
                                    className={cx('follow-btn')}
                                    onClick={() => handleFollow(video.user._id)}
                                >
                                    Follow
                                </Button>
                            )}
                        </li>
                    );
                })}
            </ul>
            <div id="list-end" ref={containerRef}></div>
        </>
    );
}
