import React, { useEffect, useState } from 'react';
import styles from './Following.module.scss';
import classnames from 'classnames/bind';

import Video from '~/components/Video';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import { useSelector } from 'react-redux';
import { authSelector, usersSelector, videosSelector } from '~/redux/selectors';

const cx = classnames.bind(styles);

export default function Following() {
    const [settings, setSettings] = useState({
        isMuted: true,
        volume: 1,
    });

    const { users } = useSelector(usersSelector);
    const { currentUser } = useSelector(authSelector);
    const { videos } = useSelector(videosSelector);

    const [isPlaying, setIsPlaying] = useState(false);

    const followingUserVideos = videos.filter((video) =>
        currentUser?.followingIDs?.includes(video.userID),
    );

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

    const handlePlay = (bool) => {
        setIsPlaying(bool);
    };

    return (
        <div className={cx('wrapper')}>
            <ul className={cx('video-list')}>
                {followingUserVideos.map((video) => {
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
                                onPlay={handlePlay}
                                isPlaying={isPlaying}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
