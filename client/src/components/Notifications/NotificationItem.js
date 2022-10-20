import React, { useEffect, useState } from 'react';
import Avatar from '../Avatar';
import Button from '../Button';
import { CheckedIcon } from '../Icons';
import * as videoService from '~/services/videoService';
import { Link } from 'react-router-dom';

export default function NotificationItem({ notif }) {
    const [video, setVideo] = useState({});

    useEffect(() => {
        (async () => {
            if (notif.videoID) {
                const video = await videoService.getVideo(notif.videoID);
                setVideo(video);
            }
        })();
    }, [notif]);
    const renderAction = (type) => {
        switch (type) {
            case 'follow':
                return <span>Follows you.</span>;
            case 'like':
                if (notif.subType === 'like-video')
                    return <span>liked your video.</span>;
                return <span>liked your comment.</span>;
            case 'comment':
                return <span>commented: Hahaha, vãi giếng</span>;
            case 'mention':
                return (
                    <span>
                        mentioned you in a comment: {notif.comment.text}
                    </span>
                );
            default:
                return;
        }
    };

    let Comp;
    if (notif.videoID) {
        Comp = Link;
    } else {
        Comp = 'div';
    }

    return (
        <li>
            <Comp
                to={`/@${video?.user?.username}/video/${video?._id}`}
                className="notification-item"
            >
                <Avatar
                    src={notif.user.avatar || ''}
                    width="4.8rem"
                    height="4.8rem"
                />
                <div className="notification-content">
                    <h4 className="notification-content_username">
                        {notif.user.username}
                        <span className="icon-wrapper">
                            <CheckedIcon
                                className="check"
                                width="1.4rem"
                                height="1.4rem"
                            />
                        </span>
                    </h4>
                    <p className="notification-desc">
                        {renderAction(notif.type)}
                        <span className="notification-time">5-8</span>
                        {notif.subType === 'like-comment' && (
                            <span className="notification-desc__comment">{`${notif.user.username}: ${notif.comment.text}`}</span>
                        )}
                    </p>
                </div>
                {notif.type === 'follow' ? (
                    <Button primary className="notification-follow-btn">
                        Follow back
                    </Button>
                ) : (
                    <div className="video-cover"></div>
                )}
            </Comp>
        </li>
    );
}
