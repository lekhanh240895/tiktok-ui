import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faComment,
    faFlag,
    faHeart,
    faPlay,
    faShare,
} from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './VideoItem.module.scss';
import Image from '~/components/Image';
import { MutedVolumeIcon, PauseIcon, VolumeIcon } from '~/components/Icons';
import Button from '~/components/Button';
import { MusicIcon } from '~/components/Icons';

const cx = classnames.bind(styles);

export default function VideoItem({ src }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0);
    const [progress, setProgress] = useState(0);

    const videoRef = useRef();

    const handlePlay = () => {
        if (!videoRef.current.paused) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const handleMuteVolume = () => {
        setIsMuted(!isMuted);
    };

    const handleVolumeChange = (e) => {
        const newVolume = Number(e.target.value);

        setIsMuted(false);
        setVolume(newVolume);

        videoRef.current.volume = newVolume;
    };

    const handleTimeUpdate = () => {
        const { currentTime, duration } = videoRef.current;

        const progress = Math.floor((currentTime / duration) * 100);

        setProgress(progress);
    };

    const handleProgressChange = (e) => {
        const { duration } = videoRef.current;

        const newTime = (Number(e.target.value) * duration) / 100;

        videoRef.current.currentTime = newTime;
    };

    const handleReport = () => {};

    const handleFormatTime = (seconds) => {
        let m = Math.floor(seconds / 60);
        let s = Math.floor(seconds % 60);

        if (m < 10) {
            m = '0' + m;
        }

        if (s < 10) {
            s = '0' + s;
        }

        const time = m + ':' + s;

        return time;
    };

    return (
        <div className={cx('wrapper')}>
            <Link to="/@123">
                <Image
                    className={cx('avatar')}
                    src="http:\\picsum.photos/50/50"
                    alt="avatar"
                />
            </Link>

            <div className={cx('content')}>
                <div className={cx('info')}>
                    <div className={cx('header')}>
                        <Link to="/@123" className={cx('styleAuthor')}>
                            <h3 className={cx('name')}>itsmenicksmithy2</h3>

                            <h4 className={cx('nickname')}>
                                Nick Smithyman 😎
                            </h4>
                        </Link>
                    </div>

                    <p className={cx('video-desc')}>
                        Cute fishy
                        {/* Keywords */}
                        {['abc', 'def', 'def'].map((keyword, index) => (
                            <Link to="/@123" key={index}>
                                <span key={index} className={cx('video-tag')}>
                                    #{keyword}
                                </span>
                            </Link>
                        ))}
                    </p>

                    <h4 className={cx('video-music')}>
                        <Button
                            leftIcon={
                                <MusicIcon width="1.6rem" height="1.6rem" />
                            }
                            text={true}
                            to={`/music/test`}
                        >
                            original sound - Nick Smithyman 😎
                        </Button>
                    </h4>

                    <Button outline small className={cx('follow-btn')}>
                        Follow
                    </Button>
                </div>

                <div className={cx('video-wrapper')}>
                    <div className={cx('video-card-container')}>
                        <div className={cx('video-player-container')}>
                            <video
                                ref={videoRef}
                                loop
                                className={cx('video')}
                                muted={isMuted}
                                volume={volume}
                                onTimeUpdate={handleTimeUpdate}
                                src={src}
                            />

                            <span
                                className={cx('play-icon', 'icon-wrapper')}
                                onClick={handlePlay}
                            >
                                {isPlaying ? (
                                    <PauseIcon />
                                ) : (
                                    <FontAwesomeIcon icon={faPlay} />
                                )}
                            </span>

                            <div>
                                <HeadlessTippy
                                    placement="top"
                                    offset={[0, 5]}
                                    interactive
                                    trigger="click"
                                    render={(attrs) => (
                                        <div
                                            tabIndex="-1"
                                            {...attrs}
                                            className={cx('volume-wrapper')}
                                        >
                                            <input
                                                type="range"
                                                min={0}
                                                max={1}
                                                step={0.02}
                                                className={cx('volumn-input')}
                                                value={volume}
                                                onChange={handleVolumeChange}
                                            />
                                        </div>
                                    )}
                                >
                                    <span
                                        className={cx(
                                            'volume-icon',
                                            'icon-wrapper',
                                        )}
                                        onClick={handleMuteVolume}
                                    >
                                        {isMuted ? (
                                            <MutedVolumeIcon />
                                        ) : (
                                            <VolumeIcon />
                                        )}
                                    </span>
                                </HeadlessTippy>
                            </div>

                            <div className={cx('video-footer')}>
                                <div
                                    className={cx('video-progress-bar-wrapper')}
                                >
                                    <input
                                        type="range"
                                        className={cx('video-progress-bar')}
                                        min={0}
                                        max={100}
                                        step={1}
                                        value={progress}
                                        onChange={handleProgressChange}
                                    />

                                    <div
                                        className={cx('video-progress')}
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>

                                {videoRef.current && (
                                    <div className={cx('timer-progress')}>
                                        {handleFormatTime(
                                            videoRef.current.currentTime,
                                        )}
                                        /
                                        {handleFormatTime(
                                            videoRef.current.duration,
                                        )}
                                    </div>
                                )}
                            </div>

                            <p
                                className={cx('report-icon', 'icon-wrapper')}
                                onClick={handleReport}
                            >
                                <FontAwesomeIcon icon={faFlag} />
                                Report
                            </p>
                        </div>
                    </div>

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
                                <span className={cx('video-stat')}>17.9k</span>
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
                                <span className={cx('video-stat')}>202</span>
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
                                <span className={cx('video-stat')}>56</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
