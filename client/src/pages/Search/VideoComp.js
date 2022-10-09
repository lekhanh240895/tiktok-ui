import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RegularPlayIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Video from '~/components/Video/Video';
import { usersSelector } from '~/redux/selectors';
import { configNumber } from '~/services';
import { VideoWrapper, VideoTitle } from './styled';

export default function VideoComp({ video, username }) {
    const videoRef = useRef(null);
    const { users } = useSelector(usersSelector);
    const user = users.find((user) => user._id === video.user._id);

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
                video={video}
                username={username}
                controls
                muted
                controlsList="nodownload"
                ref={videoRef}
            />

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
