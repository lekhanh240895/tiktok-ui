import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import classnames from 'classnames/bind';

import Video from '~/components/Video';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { useElementOnScreen } from '~/hooks/useElementOnScreen';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, usersSelector, videosSelector } from '~/redux/selectors';
import loginModalSlice from '~/redux/slices/loginModalSlice';

const cx = classnames.bind(styles);

export default function Home() {
    const [settings, setSettings] = useState({
        isMuted: true,
        volume: 1,
    });
    const { users } = useSelector(usersSelector);
    const { videos } = useSelector(videosSelector);
    const [videoCount, setVideoCount] = useState(1);

    const [containerRef, isVisible] = useElementOnScreen({
        threshold: 0,
    });
    const { currentUser } = useSelector(authSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isVisible) {
            if (videoCount < videos.length)
                setVideoCount((prevState) => prevState + 1);
            else setVideoCount(videos.length);
        }
    }, [isVisible, videoCount, videos]);

    useEffect(() => {
        const settings = JSON.parse(localStorage.getItem('userSettings'));

        setSettings((prevState) => ({ ...prevState, ...settings }));
    }, []);

    const setConfig = (key, value) => {
        settings[key] = value;
        localStorage.setItem('userSettings', JSON.stringify(settings));
    };

    const handleMuteVolume = () => {
        setSettings({
            ...settings,
            isMuted: !settings.isMuted,
        });
        setConfig('isMuted', !settings.isMuted);
    };

    const handleVolumeChange = (e) => {
        const newVolume = Number(e.target.value);

        setSettings({
            ...settings,
            volume: newVolume,
            isMuted: newVolume > 0 ? false : true,
        });

        setConfig('volume', newVolume);
    };

    const handleFollow = () => {
        if (!currentUser) dispatch(loginModalSlice.actions.show());
    };

    return (
        <div className={cx('wrapper')}>
            <ul className={cx('video-list')}>
                {videos.slice(0, videoCount).map((video) => {
                    const user = users.find(
                        (user) => user?._id === video.userID,
                    );
                    return (
                        <li key={video._id} className={cx('video-item')}>
                            <Link to={`/@${user?.username}`}>
                                <Image
                                    className={cx('avatar')}
                                    src={user?.avatar}
                                    alt="avatar"
                                />
                            </Link>

                            <Video
                                video={video}
                                user={user}
                                isMuted={settings.isMuted}
                                volume={settings.volume}
                                onMutedVolume={handleMuteVolume}
                                onVolumeChange={handleVolumeChange}
                            />

                            <Button
                                outline
                                small
                                className={cx('follow-btn')}
                                onClick={handleFollow}
                            >
                                Follow
                            </Button>
                        </li>
                    );
                })}
            </ul>
            <div id="list-end" ref={containerRef}></div>
        </div>
    );
}
