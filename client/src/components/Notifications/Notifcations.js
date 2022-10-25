import React, { useEffect, useState } from 'react';

import NotificationItem from './NotificationItem';
import { Wrapper } from './styled';

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

export default function Notifications({ notifications }) {
    const [type, setType] = useState('all');
    const [filterNotifs, setFilterNotifs] = useState([]);

    useEffect(() => {
        if (type !== 'all') {
            const newFilterNotifs = notifications.filter(
                (n) => n.type === type,
            );
            setFilterNotifs(newFilterNotifs);
        } else {
            setFilterNotifs(notifications);
        }
    }, [type, notifications]);

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
                {filterNotifs.length > 0 && (
                    <>
                        <p className="time-group">Previous</p>
                        <ul className="notification-list">
                            {filterNotifs.map((notif, index) => (
                                <NotificationItem key={index} notif={notif} />
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </Wrapper>
    );
}
