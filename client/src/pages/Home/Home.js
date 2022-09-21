import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import classnames from 'classnames/bind';

import Video from '~/components/Video';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { useElementOnScreen } from '~/hooks/useElementOnScreen';
import { useSelector } from 'react-redux';
import { usersSelector, videosSelector } from '~/redux/selectors';

const cx = classnames.bind(styles);

export default function Home() {
    const [settings, setSettings] = useState({
        isMuted: true,
        volume: 1,
    });
    const { users } = useSelector(usersSelector);
    const videos = useSelector(videosSelector);
    const [videoCount, setVideoCount] = useState(1);

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

    const [containerRef, isVisible] = useElementOnScreen({
        threshold: 0,
    });

    useEffect(() => {
        if (isVisible) {
            if (videoCount < videos.length)
                setVideoCount((prevState) => prevState + 1);
            else setVideoCount(videos.length);
        }
    }, [isVisible, videoCount, videos]);

    return (
        <div className={cx('wrapper')}>
            <ul className={cx('video-list')}>
                {videos.slice(0, videoCount).map((video) => {
                    const user = users.find(
                        (user) => user?.id === video.userId,
                    );
                    return (
                        <li key={video.id} className={cx('video-item')}>
                            <Link to={`/@${user?.nickname}`}>
                                <Image
                                    className={cx('avatar')}
                                    src={user?.avatar}
                                    alt="avatar"
                                />
                            </Link>

                            <Video
                                data={video}
                                user={user}
                                isMuted={settings.isMuted}
                                volume={settings.volume}
                                onMutedVolume={handleMuteVolume}
                                onVolumeChange={handleVolumeChange}
                            />

                            <Button outline small className={cx('follow-btn')}>
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
