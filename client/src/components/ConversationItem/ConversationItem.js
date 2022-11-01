import React, { useEffect, useState } from 'react';
import Avatar from '../Avatar';
import { Wrapper } from './styled';
import * as messageService from '~/services/messageService';
import { formatRelative } from 'date-fns';
import { useSelector } from 'react-redux';
import { appSelector } from '~/redux/selectors';
import {
    BlockIcon,
    DeleteIcon,
    FlagIcon,
    MuteIcon,
    OptionIcon,
    PinTopIcon,
} from '../Icons';
import Menu from '../Popper/Menu';

export default function ConversationItem({
    user,
    conversation,
    active,
    isOnline,
    onSelectedConversation,
    onDeleteConversation,
    unreadMessages,
}) {
    const unreadConversationMessages = unreadMessages.filter(
        (message) => message.conversation === conversation._id,
    );
    const [messages, setMessages] = useState([]);
    const { socket } = useSelector(appSelector);
    const [isRead, setIsRead] = useState(
        unreadConversationMessages?.length === 0,
    );

    const handleSelectConversation = () => {
        onSelectedConversation();
        setIsRead(true);
        const newUnreads = unreadMessages.filter(
            (message) =>
                !unreadConversationMessages.some((m) => m._id === message._id),
        );

        if (newUnreads)
            localStorage.setItem('unreadMessages', JSON.stringify(newUnreads));
    };

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

    const CHAT_MENU = [
        {
            icon: <MuteIcon width="1.6rem" height="1.6rem" />,
            title: 'Mute',
        },
        {
            icon: <DeleteIcon width="1.6rem" height="1.6rem" />,
            title: 'Delete',
            separate: true,
            conversationID: conversation._id,
        },
        {
            icon: <PinTopIcon width="1.6rem" height="1.6rem" />,
            title: 'Pin to top',
            separate: true,
        },
        {
            icon: <FlagIcon width="1.6rem" height="1.6rem" />,
            title: 'Report',
            separate: true,
        },
        {
            icon: <BlockIcon width="1.6rem" height="1.6rem" />,
            title: 'Block',
            separate: true,
        },
    ];

    return (
        <Wrapper
            className={
                active ? 'conversation-item--active' : 'conversation-item'
            }
            onClick={handleSelectConversation}
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
                        <span
                            className={
                                isRead
                                    ? 'conversation-text'
                                    : 'conversation-text unread'
                            }
                        >
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
            <Menu
                items={CHAT_MENU}
                trigger="click"
                paddingMenu
                onDeleteConversation={onDeleteConversation}
            >
                <span className="option-icon icon-wrapper">
                    <OptionIcon width="2.4rem" height="2.4rem" />
                </span>
            </Menu>
        </Wrapper>
    );
}
