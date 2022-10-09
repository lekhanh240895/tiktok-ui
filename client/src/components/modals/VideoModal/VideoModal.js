import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    DeleteIcon,
    DownArrow,
    FlagIcon,
    PlayIcon,
    TiktokIcon,
    VolumeIcon,
    MutedVolumeIcon,
} from '~/components/Icons';
import { usersSelector, videosSelector } from '~/redux/selectors';
import Content from './Content';
import { Wrapper } from './styled';

export default function VideoModal() {
    const navigate = useNavigate();
    const { username, videoID } = useParams();
    const { videos } = useSelector(videosSelector);
    const { users } = useSelector(usersSelector);
    const video = videos.find((video) => video._id === videoID);
    const user = users.find((user) => user.username === username);
    const videoRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);

    const escFunction = useCallback(
        (event) => {
            if (event.key === 'Escape') {
                navigate(-1);
            }
        },
        [navigate],
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

    if (!video || !user) return;
    return (
        <Wrapper>
            <div className="modal">
                <div className="modal_inner">
                    <div className="video-container">
                        <div className="header">
                            <div className="left">
                                <span
                                    className="delete-btn icon-wrapper"
                                    onClick={() => navigate(-1)}
                                >
                                    <DeleteIcon
                                        width="2.6rem"
                                        height="2.6rem"
                                    />
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
                                        ref={videoRef}
                                        className="video"
                                        muted={isMuted}
                                        onTimeUpdate={handleTimeUpdate}
                                        autoPlay
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
                                <span className="previous icon-wrapper">
                                    <DownArrow width="2.6rem" height="2.6rem" />
                                </span>
                                <span className="next icon-wrapper">
                                    <DownArrow width="2.6rem" height="2.6rem" />
                                </span>
                            </div>

                            <span
                                className="volume-wrapper icon-wrapper"
                                onClick={() => setIsMuted(!isMuted)}
                            >
                                {isMuted ? (
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
                        </div>
                    </div>

                    <Content user={user} video={video} />
                </div>
            </div>
        </Wrapper>
    );
}
