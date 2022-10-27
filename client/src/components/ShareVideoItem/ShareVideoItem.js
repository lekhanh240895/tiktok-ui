import { useRef } from 'react';
import styled from 'styled-components';
import Video from '../Video/Video';
import VideoTitle from '../VideoTitle';

export default function ShareVideoItem({ video, children }) {
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
                video={video}
                muted
                ref={videoRef}
                poster={video.cover ? video.cover : ''}
            />

            <p className="video-title">
                <VideoTitle title={video.title} />
            </p>

            {children}
        </VideoWrapper>
    );
}

export const VideoWrapper = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: 4px;

    .video-title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 21px;
        font-size: 1.4rem;
    }

    .sub-content {
        position: absolute;
        bottom: 40px;
        left: 12px;
        right: 0;
        color: #fff;
        max-height: 46px;
        display: flex;
        align-items: center;
        max-width: calc(100% - 24px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        .user-info {
            display: flex;
            align-items: center;
            color: #fff;
            padding: 24px 12px 12px 0;

            .avatar-wrapper {
                width: 24px;
                height: 24px;
                .avatar {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    object-fit: contain;
                }
            }
        }

        .video-info {
            margin-top: 2px;
            margin-left: 5px;
            font-weight: 600;
            vertical-align: middle;

            .check {
                margin-left: 5px;
            }
        }

        .video-time {
            margin-bottom: 30px;
        }
    }

    .play-line {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 4px;

        .user-info {
            display: flex;
            align-items: center;

            .avatar {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                object-fit: contain;
            }
            span {
                margin: 0 4px;
            }
        }

        .play-card {
            display: flex;
            align-items: center;

            span {
                margin: 0 4px;
            }
        }
    }
`;
