import { forwardRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

export const Video = forwardRef(({ video, ...props }, ref) => {
    const location = useLocation();
    return (
        <Link
            to={`/@${video.user.username}/video/${video._id}`}
            state={{ background: location }}
        >
            <VideoElm {...props} ref={ref}>
                <source src={video.src} type="video/mp4" />
            </VideoElm>
        </Link>
    );
});

const VideoElm = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export default Video;
