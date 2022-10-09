import { useRef } from 'react';
import styled from 'styled-components';
import Video from '../Video/Video';

export default function ShareVideoItem({ video, username }) {
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
            <Video
                username={username}
                video={video}
                controls
                muted
                controlsList="nodownload"
                ref={videoRef}
                poster={video.cover ? video.cover : ""}
            />

            <VideoTitle>{video.title}</VideoTitle>
        </VideoWrapper>
    );
}

export const VideoWrapper = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: 4px;
`;

export const VideoTitle = styled.p`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 21px;
    font-size: 1.4rem;
`;
