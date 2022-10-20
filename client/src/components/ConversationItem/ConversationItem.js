import React, { useEffect, useState } from 'react';
import Avatar from '../Avatar';
import { Wrapper } from './styled';
import * as messageService from '~/services/messageService';
import { formatRelative } from 'date-fns';
import { useSelector } from 'react-redux';
import { appSelector } from '~/redux/selectors';

export default function ChatItem({
    user,
    onSelectedConversation,
    conversation,
    active,
    isOnline,
}) {
    const [messages, setMessages] = useState([]);
    const { socket } = useSelector(appSelector);
    // Get conversation's messages
    useEffect(() => {
        (async () => {
            const messages = await messageService.get(conversation._id);
            setMessages(messages);
        })();
    }, [conversation]);
    useEffect(() => {
        socket?.on('getMessage', (data) => {
            setMessages((prev) => [...prev, data]);
        });
    }, [socket]);

    const lastMessage = messages[messages.length - 1];

    const formatDate = (timestamp) => {
        const date = formatRelative(new Date(timestamp), new Date());
        let formatDate;
        if (date.startsWith('today at')) {
            formatDate = date.replace('today at', '');
        }
        return formatDate || date;
    };

    return (
        <Wrapper
            className={
                active ? 'conversation-item--active' : 'conversation-item'
            }
            onClick={() => onSelectedConversation()}
        >
            <div className="avatar-wrapper">
                <Avatar
                    src={user?.avatar}
                    width="5.6rem"
                    height="5.6rem"
                    alt="Avatar"
                />
                {isOnline && <span className="online-circle"></span>}
            </div>
            <div className="conversation-content-wrapper">
                <h4 className="conversation-user">{user?.full_name}</h4>
                <div className="conversation-content">
                    {lastMessage && (
                        <span className="conversation-text">
                            {lastMessage.text}
                        </span>
                    )}
                    <span className="conversation-time">
                        {lastMessage
                            ? formatDate(lastMessage.createdAt)
                            : formatDate(new Date())}
                    </span>
                </div>
            </div>
        </Wrapper>
    );
}
