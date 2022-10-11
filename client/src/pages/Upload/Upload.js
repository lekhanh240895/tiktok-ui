import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '~/components/Button';
import { CloudUploadIcon } from '~/components/Icons';

import { authSelector } from '~/redux/selectors';
import { Wrapper } from './styled';
import {
    generateVideoThumbnails,
    getVideoDurationFromVideoFile,
    importFileandPreview,
} from '@rajesh896/video-thumbnails-generator';
import RightBody from './RightBody';
import VideoPreview from './VideoPreview';

export default function Upload() {
    const uploadRef = useRef(null);
    const videoRef = useRef(null);
    const [videoUrl, setVideoUrl] = useState('');
    const { currentUser } = useSelector(authSelector);
    const [progress, setProgress] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [video, setVideo] = useState(null);
    const [caption, setCaption] = useState('');
    const [videoThumb, setVideoThumb] = useState('');
    const [thumbnails, setThumbnails] = useState([]);
    const [duration, setDuration] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    useEffect(() => {
        if (video) {
            const videoName = video.name.split('.')[0];
            setCaption(videoName);

            importFileandPreview(video).then((res) => {
                setVideoUrl(res);
            });
            getVideoDurationFromVideoFile(video).then((duration) => {
                setDuration(duration);
            });
            generateVideoThumbnails(video, duration).then((thumbs) => {
                setThumbnails(thumbs);
            });
        } else {
            setVideoThumb('');
            setThumbnails([]);
        }
    }, [duration, video]);

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(videoUrl);
        };
    }, [videoUrl]);

    useEffect(() => {
        if (thumbnails.length > 0) {
            setVideoThumb(thumbnails[0]);
        } else {
            setVideoThumb('');
        }
    }, [thumbnails]);

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
        setCaption('');
    };

    const handleClickProgress = (e) => {
        const rect = e.target.getBoundingClientRect();
        e.cancelBubble = true; //IE
        e.stopPropagation();
        const newProgress = parseInt(
            ((e.clientX - rect.left) / e.target.parentNode.clientWidth) * 100,
            10,
        );

        setProgress(newProgress);
        const newCurrentTime = (duration * newProgress) / 100;
        videoRef.current.currentTime = newCurrentTime;
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };
    // triggers when file is dropped
    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            const extension = file.type.split('/')[0];

            if (extension === 'video') setVideo(file);
        }
    };

    return (
        <Wrapper>
            <div className="header">
                <h2 className="heading">Upload video</h2>
                <p className="desc">Post a video to your account</p>
            </div>

            <div className="body">
                {video ? (
                    <VideoPreview
                        videoUrl={videoUrl}
                        isMuted={isMuted}
                        videoThumb={videoThumb}
                        video={video}
                        currentUser={currentUser}
                        caption={caption}
                        videoRef={videoRef}
                        handleTimeUpdate={handleTimeUpdate}
                        progress={progress}
                        handleClickProgress={handleClickProgress}
                        handlePlay={handlePlay}
                        isPlaying={isPlaying}
                        setIsMuted={setIsMuted}
                    />
                ) : (
                    <div className="left-body" onDragEnter={handleDrag}>
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

                        {dragActive && (
                            <div
                                className="drag-file-element"
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            ></div>
                        )}
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
                    currentUser={currentUser}
                />
            </div>
        </Wrapper>
    );
}
