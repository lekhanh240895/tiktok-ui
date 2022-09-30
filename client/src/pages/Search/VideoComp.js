import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RegularPlayIcon } from '~/components/Icons';
import Image from '~/components/Image';
import { usersSelector } from '~/redux/selectors';
import { configNumber } from '~/services';
import { VideoWrapper, VideoTitle, Video } from './styled';

export default function VideoComp({ video }) {
    const videoRef = useRef(null);
    const { users } = useSelector(usersSelector);
    const user = users.find((user) => user._id === video.userID);

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
            <Video controls muted controlsList="nodownload" ref={videoRef}>
                <source src={video.src} type="video/mp4" />
            </Video>
            <VideoTitle>{video.title}</VideoTitle>

            <div className="play-line">
                <div className="user-info">
                    <Image src={user.avatar} className="avatar" alt="avatar" />
                    <span className="username">{user.username}</span>
                </div>

                <div className="play-card">
                    <RegularPlayIcon width="1.6rem" height="1.6rem" />
                    <span>{configNumber(video.views)}</span>
                </div>
            </div>
        </VideoWrapper>
    );
}
