import React, { useRef } from 'react';
import { VideoWrapper, VideoTitle, Video } from './styled';

export default function VideoComp({ src, title }) {
    const videoRef = useRef(null);

    const handleHoverVideo = () => {
        videoRef.current.play();
    };

    const handleHoverOff = () => {
        videoRef.current.pause();
    };

    return (
        <VideoWrapper
            onMouseEnter={handleHoverVideo}
            onMouseLeave={handleHoverOff}
        >
            <Video controls controlsList="nodownload" ref={videoRef}>
                <source src={src} type="video/mp4" />
            </Video>
            <VideoTitle>{title}</VideoTitle>
        </VideoWrapper>
    );
}
