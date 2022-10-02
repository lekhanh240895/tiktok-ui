import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '~/components/Button';
import { CheckedIcon, CloudUploadIcon, MusicIcon } from '~/components/Icons';
import Image from '~/components/Image';
import { authSelector } from '~/redux/selectors';
import { Wrapper } from './styled';
import {
    generateVideoThumbnails,
    getVideoDurationFromVideoFile,
} from '@rajesh896/video-thumbnails-generator';
import RightBody from './RightBody';

export default function Upload() {
    const uploadRef = useRef(null);
    const videoRef = useRef(null);
    const [videoUrl, setVideoUrl] = useState('');
    const { currentUser } = useSelector(authSelector);
    const [progress, setProgress] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [video, setVideo] = useState(null);
    const [caption, setCaption] = useState('');
    const [videoThumb, setVideoThumb] = useState('');
    const [thumbnails, setThumbnails] = useState([]);
    const [duration, setDuration] = useState(null);

    useEffect(() => {
        if (video) {
            getVideoDurationFromVideoFile(video).then((duration) => {
                setDuration(duration);
            });
            generateVideoThumbnails(video, duration).then((thumbs) => {
                setThumbnails(thumbs);
            });
        }
    }, [duration, video]);

    useEffect(() => {
        if (thumbnails.length > 0) {
            setVideoThumb(thumbnails[0]);
        } else {
            setVideoThumb('');
        }
    }, [thumbnails]);

    useEffect(() => {
        if (video) {
            const videoName = video.name.split('.')[0];
            setCaption(videoName);
            const url = URL.createObjectURL(video);
            setVideoUrl(url);
        } else {
            setVideoThumb('');
            setThumbnails([]);
        }
    }, [video]);

    const handleChange = (e) => {
        const video = e.target.files[0];
        setVideo(video);
    };

    const handleTimeUpdate = () => {
        const { currentTime, duration } = videoRef.current;
        const progress = Math.floor((currentTime / duration) * 100);
        setProgress(progress);
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

    const handleDiscard = () => {
        setVideo(null);
        setProgress(0);
        setIsPlaying(true);
        setDuration(0);
    };

    const handleFormatTime = (seconds) => {
        let m = Math.floor(seconds / 60);
        let s = Math.floor(seconds % 60);

        if ((m > 0) & (m < 10)) {
            m = '0' + m;
        } else if (m <= 0) {
            m = '0';
        }

        if (s < 10) {
            s = '0' + s;
        }

        const time = m + ':' + s;

        return time;
    };

    return (
        <Wrapper>
            <div className="header">
                <h2 className="heading">Upload video</h2>
                <p className="desc">Post a video to your account</p>
            </div>

            <div className="body">
                {video ? (
                    <div>
                        <div className="video-preview">
                            <video
                                src={videoUrl}
                                className="video"
                                ref={videoRef}
                                muted={isMuted}
                                onTimeUpdate={handleTimeUpdate}
                                autoPlay
                                loop
                                poster={videoThumb && videoThumb}
                                type={video?.type}
                            />
                            <div className="title">
                                <span>Following</span>
                                <span>For You</span>
                            </div>
                            <div className="meta-data">
                                <h5 className="username">{`@${currentUser?.username}`}</h5>
                                <p className="caption">{caption}</p>
                                <div className="sound-container">
                                    <span>
                                        <MusicIcon
                                            width="1.7rem"
                                            height="1.7rem"
                                        />
                                    </span>
                                    <div className="sound">
                                        Original sound -{' '}
                                        {`${currentUser?.username}`}
                                    </div>
                                </div>
                            </div>
                            <div className="avatar-container">
                                <Image
                                    src={currentUser.avatar}
                                    alt="avatar"
                                    className="avatar"
                                />
                            </div>
                            <div className="music-bar-icon">
                                <Image
                                    src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/iconbar_right.8fa90e26.svg"
                                    alt="music-bar-icon"
                                />
                            </div>
                            <div className="album-container">
                                <div className="album"></div>
                                <Image
                                    src={currentUser.avatar}
                                    alt="avatar"
                                    className="album-img"
                                />
                            </div>
                            <div className="video-controls">
                                <div className="video-controls-bottom">
                                    <div className="detail">
                                        <div className="left">
                                            <span
                                                className="play"
                                                onClick={handlePlay}
                                            >
                                                <img
                                                    src={
                                                        isPlaying
                                                            ? 'https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/pause.3f559180.svg'
                                                            : 'https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/play.6cac639f.svg'
                                                    }
                                                    alt="play-icon"
                                                />
                                            </span>

                                            <span className="time">
                                                {handleFormatTime(
                                                    videoRef.current
                                                        ?.currentTime || 0,
                                                )}{' '}
                                                /{' '}
                                                {handleFormatTime(
                                                    videoRef.current
                                                        ?.duration || 0,
                                                )}
                                            </span>
                                        </div>
                                        <div className="right">
                                            <span
                                                className="volume"
                                                onClick={() =>
                                                    setIsMuted(!isMuted)
                                                }
                                            >
                                                <img
                                                    src={
                                                        isMuted
                                                            ? 'https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/mute.75fcd465.svg'
                                                            : 'https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/volume.507835e8.svg'
                                                    }
                                                    alt="volume"
                                                />
                                            </span>
                                            <span className="fullscreen">
                                                <img
                                                    src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/fullscreen.399035a9.svg"
                                                    alt="fullscreen"
                                                />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="progress-wrap">
                                        <div className="progress"></div>
                                        <div
                                            className="circle"
                                            style={{ left: `${progress}%` }}
                                        ></div>
                                        <div
                                            className="bar"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <div className="tiktok-app-frame"></div>
                        </div>
                        <div className="change-video">
                            <span className="video-name icon-wrapper">
                                <CheckedIcon width="1.6rem" height="1.6rem" />
                                video1.mp4
                            </span>
                            <Button text className="change-btn">
                                Change video
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="left-body">
                        <label className="upload-body" htmlFor="upload-video">
                            <span className="upload-icon">
                                <CloudUploadIcon width="4rem" height="2.9rem" />
                            </span>
                            <span className="title">
                                Select video to upload
                            </span>
                            <p className="sub-title">
                                Or drag and drop a video
                            </p>

                            <div className="video-info">
                                <div>MP4 or WebM</div>
                                <div>720x1280 resolution or higher</div>
                                <div>Up to 10 minutes</div>
                                <div>Less than 2 GB</div>
                            </div>
                            <Button
                                primary
                                className="select-btn"
                                onClick={() => uploadRef.current.click()}
                            >
                                Select video
                            </Button>
                        </label>
                    </div>
                )}

                <input
                    type="file"
                    hidden
                    id="upload-video"
                    accept="video/mp4,video/x-m4v,video/*"
                    onChange={handleChange}
                    ref={uploadRef}
                />

                <RightBody
                    thumbnails={thumbnails}
                    caption={caption}
                    setCaption={setCaption}
                    videoThumb={videoThumb}
                    setVideoThumb={setVideoThumb}
                    onDiscard={handleDiscard}
                    video={video}
                    disabled={videoUrl}
                />
            </div>
        </Wrapper>
    );
}
