import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faPlay } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './Video.module.scss';
import { MutedVolumeIcon, PauseIcon, VolumeIcon } from '~/components/Icons';
import ActionList from './ActionList';
import Info from './Info';

const cx = classnames.bind(styles);
export default function Video({
    data,
    user,
    isMuted,
    volume,
    onMutedVolume,
    onVolumeChange,
    onPlay,
    isPlaying,
}) {
    const [progress, setProgress] = useState(0);

    const videoRef = useRef();

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
        }
    }, [volume]);

    const handleObserve = () => {
        let options = {
            rootMargin: '0px',
            threshold: [0.75, 1],
        };

        let handlePlay = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const promise = videoRef.current.play();
                    promise
                        .then(() => onPlay(true))
                        .catch((err) => console.log(err));
                } else {
                    videoRef.current.pause();
                }
            });
        };

        let observer = new IntersectionObserver(handlePlay, options);

        observer.observe(videoRef.current);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleObserve);

        return () => {
            window.removeEventListener('scroll', handleObserve);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePlay = () => {
        if (!videoRef.current.paused) {
            videoRef.current.pause();
            onPlay(false);
        } else {
            videoRef.current.play();
            onPlay(true);
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
            <Info data={data} user={user} />

            <div className={cx('video-card-wrapper')}>
                <div className={cx('video-card-container')}>
                    <canvas
                        width="56.25"
                        height="100"
                        className={cx('canvas-video-card-player')}
                    ></canvas>

                    <div className={cx('video-player-container')}>
                        <video
                            ref={videoRef}
                            loop
                            className={cx('video')}
                            muted={isMuted}
                            onTimeUpdate={handleTimeUpdate}
                            id="targetVideo"
                            volume={volume}
                        >
                            <source src={data.src} type="video/mp4"></source>
                        </video>

                        <div className={cx('buttons-in-video')}>
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
                                                className={cx('volumn-input')}
                                                value={volume}
                                                onChange={onVolumeChange}
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
                                <FontAwesomeIcon icon={faFlag} />
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
                                                videoRef.current.currentTime,
                                            )}
                                            /
                                            {handleFormatTime(
                                                videoRef.current.duration,
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <ActionList data={data} />
            </div>
        </div>
    );
}

Video.propTypes = {
    data: PropTypes.object.isRequired,
    isMuted: PropTypes.bool.isRequired,
    volume: PropTypes.number.isRequired,
    onMutedVolume: PropTypes.func.isRequired,
    onVolumeChange: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
};
