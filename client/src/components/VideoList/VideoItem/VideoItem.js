import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './Video.module.scss';
import {
    FlagIcon,
    MutedVolumeIcon,
    PauseIcon,
    PlayIcon,
    VolumeIcon,
} from '~/components/Icons';
import ActionList from './ActionList';
import Info from './Info';
import { useElementOnScreen } from '~/hooks/useElementOnScreen';
import Video from '../../Video/Video';

const cx = classnames.bind(styles);
export default function VideoItem({
    video,
    isMuted,
    volume,
    onMutedVolume,
    onVolumeChange,
    time = false,
}) {
    const [progress, setProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [containerRef, isVisible] = useElementOnScreen({
        threshold: 0.75,
    });

    const videoRef = useRef();

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
        }
    }, [videoRef, volume]);

    useEffect(() => {
        if (isVisible) {
            const promise = videoRef.current.play();
            promise
                .then(() => setIsPlaying(true))
                .catch((err) => console.log(err));
        } else {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoRef, isVisible]);

    const handlePlay = () => {
        if (!videoRef.current.paused) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play();
            setIsPlaying(true);
        }
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
            <Info video={video} time={time} />

            <div className={cx('video-card-wrapper')}>
                <div className={cx('video-card-container')}>
                    <canvas
                        width="56.25"
                        height="100"
                        className={cx('canvas-video-card-player')}
                    ></canvas>

                    <div
                        className={cx('video-player-container')}
                        ref={containerRef}
                    >
                        <Video
                            video={video}
                            ref={videoRef}
                            loop
                            className={cx('video')}
                            muted={isMuted}
                            onTimeUpdate={handleTimeUpdate}
                            id="targetVideo"
                        />

                        <div className={cx('buttons-in-video')}>
                            <span
                                className={cx('play-icon', 'icon-wrapper')}
                                onClick={handlePlay}
                            >
                                {isPlaying ? <PauseIcon /> : <PlayIcon />}
                            </span>

                            <div>
                                <HeadlessTippy
                                    placement="top"
                                    offset={[0, 5]}
                                    interactive
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
                                                step={0.1}
                                                className={cx('volume-input')}
                                                value={volume}
                                                onChange={onVolumeChange}
                                            />
                                            <div
                                                className={cx('bar')}
                                                style={{
                                                    height: `calc(48px * ${volume}`,
                                                }}
                                            />
                                        </div>
                                    )}
                                >
                                    <span
                                        className={cx(
                                            'volume-icon',
                                            'icon-wrapper',
                                        )}
                                        onClick={onMutedVolume}
                                    >
                                        {isMuted ? (
                                            <MutedVolumeIcon />
                                        ) : (
                                            <VolumeIcon />
                                        )}
                                    </span>
                                </HeadlessTippy>
                            </div>

                            <p
                                className={cx('report-icon', 'icon-wrapper')}
                                onClick={handleReport}
                            >
                                <FlagIcon />
                                Report
                            </p>

                            {progress > 0 && (
                                <div className={cx('video-footer')}>
                                    <div
                                        className={cx(
                                            'video-progress-bar-wrapper',
                                        )}
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
                                            style={{
                                                width: `${progress}%`,
                                            }}
                                        />
                                    </div>

                                    {videoRef.current && (
                                        <div className={cx('timer-progress')}>
                                            {handleFormatTime(
                                                videoRef.current.currentTime ||
                                                    0,
                                            )}
                                            /
                                            {handleFormatTime(
                                                videoRef.current.duration || 0,
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <ActionList video={video} />
            </div>
        </div>
    );
}

VideoItem.propTypes = {
    video: PropTypes.object.isRequired,
    isMuted: PropTypes.bool.isRequired,
    volume: PropTypes.number.isRequired,
    onMutedVolume: PropTypes.func.isRequired,
    onVolumeChange: PropTypes.func.isRequired,
};
