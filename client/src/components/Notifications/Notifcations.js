import React, { useEffect, useState } from 'react';
import NotificationItem from './NotificationItem';

import { Wrapper } from './styled';

const notifs = [
    {
        user: {
            avatar: 'https://picsum.photos/500/500',
            username: 'lekhanhhh',
        },
        type: 'like',
        subType: 'like-video',
        videoID: '632d723373ffa34b41f8c0fe',
    },
    {
        user: {
            avatar: 'https://picsum.photos/500/500',
            username: 'lekhanhhh',
        },
        type: 'like',
        subType: 'like-comment',
        videoID: '632ea5d62532d351508cff6e',
        comment: {
            text: 'cuon quaaaaa',
        },
    },
    {
        user: {
            avatar: 'https://picsum.photos/500/500',
            username: 'tosmy',
        },
        type: 'follow',
    },
    {
        user: {
            avatar: 'https://picsum.photos/500/500',
            username: 'hoahanaasi',
        },
        type: 'comment',
        videoID: '6331d2b102aa960cde6a66f4',
    },
    {
        user: {
            avatar: 'https://picsum.photos/500/500',
            username: 'j-cop',
        },
        type: 'mention',
        comment: {
            text: '@lekhanhhh Eeeee vô đây mà xem Eeeee vô đây mà xem Eeeee vô đây mà xem',
        },
        videoID: '6331d27502aa960cde6a66e8',
    },
    {
        user: {
            avatar: 'https://picsum.photos/500/500',
            username: 'lekhanhhh',
        },
        type: 'like',
        subType: 'like-video',
        videoID: '632d723373ffa34b41f8c0fe',
    },
    {
        user: {
            avatar: 'https://picsum.photos/500/500',
            username: 'lekhanhhh',
        },
        type: 'like',
        subType: 'like-comment',
        videoID: '632ea5d62532d351508cff6e',
        comment: {
            text: 'cuon quaaaaa',
        },
    },
    {
        user: {
            avatar: 'https://picsum.photos/500/500',
            username: 'tosmy',
        },
        type: 'follow',
    },
    {
        user: {
            avatar: 'https://picsum.photos/500/500',
            username: 'hoahanaasi',
        },
        type: 'comment',
        videoID: '6331d2b102aa960cde6a66f4',
    },
    {
        user: {
            avatar: 'https://picsum.photos/500/500',
            username: 'j-cop',
        },
        type: 'mention',
        comment: {
            text: '@lekhanhhh Eeeee vô đây mà xem Eeeee vô đây mà xem Eeeee vô đây mà xem',
        },
        videoID: '6331d27502aa960cde6a66e8',
    },
];

const menu = [
    {
        type: 'all',
        title: 'All activity',
    },
    {
        type: 'like',
        title: 'Likes',
    },
    {
        type: 'comment',
        title: 'Comments',
    },
    {
        type: 'mention',
        title: ' Mentions and tags',
    },
    {
        type: 'follow',
        title: 'Followers',
    },
];

export default function Notifications() {
    const [type, setType] = useState('all');
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (type !== 'all') {
            setNotifications(notifs.filter((n) => n.type === type));
        } else {
            setNotifications(notifs);
        }
    }, [type]);

    return (
        <Wrapper>
            <div className="notifications-header">
                <h2 className="notifications-header__title">Notifications</h2>
                <ul className="notifications-header__bar">
                    {menu.map((item, index) => {
                        const isActive = item.type === type;
                        return (
                            <li
                                key={index}
                                className={`notifications-header__item 
                                ${
                                    isActive &&
                                    'notifications-header__item--active'
                                } `}
                                onClick={() => setType(item.type)}
                            >
                                {item.title}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="notifications-body">
                <p className="time-group">Previous</p>
                <ul className="notification-list">
                    {notifications.length > 0 &&
                        notifications.map((notif, index) => (
                            <NotificationItem key={index} notif={notif} />
                        ))}
                </ul>
            </div>
        </Wrapper>
    );
}
