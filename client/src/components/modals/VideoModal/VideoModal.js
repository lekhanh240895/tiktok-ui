import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
    TimesIcon,
    DownArrow,
    FlagIcon,
    PlayIcon,
    TiktokIcon,
    VolumeIcon,
    MutedVolumeIcon,
} from '~/components/Icons';
import Content from './Content';
import { Wrapper } from './styled';
import * as videoService from '~/services/videoService';
import HeadlessTippy from '@tippyjs/react/headless';
import { useDispatch, useSelector } from 'react-redux';
import { appSelector, authSelector, videosSelector } from '~/redux/selectors';
import appSlice from '~/redux/slices/appSlice';

export default function VideoModal() {
    const navigate = useNavigate();
    const { videoID } = useParams();
    const dispatch = useDispatch();
    const videoRef = useRef(null);
    const [video, setVideo] = useState(null);
    const { settings } = useSelector(appSelector);
    const { videos } = useSelector(videosSelector);
    const { currentUser } = useSelector(authSelector);
    const [progress, setProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const location = useLocation();

    const setConfig = (settings) => {
        localStorage.setItem('userSettings', JSON.stringify(settings));
    };

    useEffect(() => {
        (async () => {
            const video = await videoService.getVideo(videoID);
            setVideo(video);
        })();
    }, [videoID]);

    useEffect(() => {
        if (video && settings) {
            videoRef.current.volume = settings.volume;
        }
    }, [video, settings]);

    const escFunction = useCallback(
        (event) => {
            if (event.key === 'Escape') {
                if (location.state && location.state.background) {
                    navigate(location.state.background.pathname);
                } else {
                    navigate('/');
                }
            }
        },
        [navigate, location],
    );

    useEffect(() => {
        document.addEventListener('keydown', escFunction, false);

        return () => {
            document.removeEventListener('keydown', escFunction, false);
        };
    }, [escFunction]);

    const handleTimeUpdate = () => {
        const { currentTime, duration } = videoRef.current;
        const progress = Math.floor((currentTime / duration) * 100);
        setProgress(progress);
    };

    const handleFormatTime = (seconds) => {
        let m = Math.floor(seconds / 60);
        let s = Math.floor(seconds % 60);

        if ((m > 0) & (m < 10)) {
            m = '0' + m;
        }

        if (s < 10) {
            s = '0' + s;
        }

        const time = m + ':' + s;

        return time;
    };

    const handlePlay = () => {
        if (!videoRef.current.paused) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const handleClickProgress = (e) => {
        const duration = videoRef.current.duration;
        e.cancelBubble = true; //IE
        e.stopPropagation();
        const rect = e.target.getBoundingClientRect();
        const newProgress = parseInt(
            ((e.clientX - rect.left) / e.target.clientWidth) * 100,
            10,
        ); //X position within the element.
        setProgress(newProgress);
        const newCurrentTime = (duration * newProgress) / 100;
        videoRef.current.currentTime = newCurrentTime;
    };

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
        setConfig(newSettings);
    };

    const handleClose = () => {
        if (location.state && location.state.background) {
            navigate(location.state.background.pathname);
        } else {
            navigate('/');
        }
    };

    const fypVideos = videos.filter(
        (video) => video.user._id !== currentUser?._id,
    );
    const videoIndex = fypVideos.findIndex((v) => v._id === video?._id);

    const handlePrevious = () => {
        const previousIndex =
            videoIndex - 1 < 0 ? fypVideos.length - 1 : videoIndex - 1;

        const previousVideo = fypVideos[previousIndex];
        const background = location.state.background;
        navigate(
            `/@${previousVideo.user.username}/video/${previousVideo._id}`,
            {
                state: {
                    background,
                },
            },
        );
    };

    const handleNext = () => {
        const nextIndex =
            videoIndex + 1 > fypVideos.length - 1 ? 0 : videoIndex + 1;

        const nextVideo = fypVideos[nextIndex];
        const background = location.state.background;
        navigate(`/@${nextVideo.user.username}/video/${nextVideo._id}`, {
            state: {
                background,
            },
        });
    };

    if (!video) return;

    return (
        <Wrapper>
            <div className="modal">
                <div className="modal_inner">
                    <div className="video-container">
                        <div className="header">
                            <div className="left">
                                <span
                                    className="delete-btn icon-wrapper"
                                    onClick={handleClose}
                                >
                                    <TimesIcon width="2.6rem" height="2.6rem" />
                                </span>
                                <span className="tiktok-icon">
                                    <TiktokIcon width="4rem" height="4rem" />
                                </span>
                            </div>
                            <div className="right">
                                <span className="report-icon">
                                    <FlagIcon width="1.6rem" height="1.5rem" />
                                </span>
                                Report
                            </div>
                        </div>

                        <div className="body">
                            <div
                                className="blur-background"
                                style={{
                                    backgroundImage: `url(${video?.cover})`,
                                }}
                            />

                            <div className="video-layout" onClick={handlePlay}>
                                <div className="video-wrapper">
                                    <video
                                        key={video.src}
                                        ref={videoRef}
                                        className="video"
                                        muted={settings.isMuted}
                                        onTimeUpdate={handleTimeUpdate}
                                        autoPlay={isPlaying}
                                        loop
                                        poster={video?.cover}
                                        type={video?.type}
                                    >
                                        <source
                                            src={video.src}
                                            type="video/mp4"
                                        />
                                    </video>

                                    {!isPlaying && (
                                        <span className="play-icon">
                                            <PlayIcon
                                                width="7rem"
                                                height="7rem"
                                            />
                                        </span>
                                    )}

                                    <div className="video-controller-container">
                                        <div className="progress-wrapper">
                                            <div
                                                className="progress"
                                                onClick={handleClickProgress}
                                            />
                                            <div
                                                className="progress-circle"
                                                style={{
                                                    left: `calc(${progress}% - 8px)`,
                                                }}
                                            />
                                            <div
                                                className="progress-bar"
                                                style={{
                                                    width: `${progress}%`,
                                                }}
                                            />
                                        </div>

                                        <div className="timer-container">
                                            {handleFormatTime(
                                                videoRef.current?.currentTime ||
                                                    0,
                                            )}{' '}
                                            /{' '}
                                            {handleFormatTime(
                                                videoRef.current?.duration || 0,
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="updown-icon-group">
                                <span
                                    className="previous icon-wrapper"
                                    onClick={handlePrevious}
                                >
                                    <DownArrow width="2.6rem" height="2.6rem" />
                                </span>
                                <span
                                    className="next icon-wrapper"
                                    onClick={handleNext}
                                >
                                    <DownArrow width="2.6rem" height="2.6rem" />
                                </span>
                            </div>

                            <div>
                                <HeadlessTippy
                                    placement="top"
                                    offset={[0, 8]}
                                    interactive
                                    render={(attrs) => (
                                        <div
                                            tabIndex="-1"
                                            {...attrs}
                                            className="volume-wrapper"
                                        >
                                            <input
                                                type="range"
                                                min={0}
                                                max={1}
                                                step={0.1}
                                                className="volume-input"
                                                value={settings.volume}
                                                onChange={handleVolumeChange}
                                            />
                                            <div
                                                className="bar"
                                                style={{
                                                    height: `calc(80px * ${settings.volume}`,
                                                }}
                                            />
                                        </div>
                                    )}
                                >
                                    <span
                                        className="volume-icon-wrapper icon-wrapper"
                                        onClick={handleMuteVolume}
                                    >
                                        {settings.isMuted ? (
                                            <MutedVolumeIcon
                                                width="2.6rem"
                                                height="2.6rem"
                                            />
                                        ) : (
                                            <VolumeIcon
                                                width="2.6rem"
                                                height="2.6rem"
                                            />
                                        )}
                                    </span>
                                </HeadlessTippy>
                            </div>
                        </div>
                    </div>

                    <Content video={video} />
                </div>
            </div>
        </Wrapper>
    );
}
