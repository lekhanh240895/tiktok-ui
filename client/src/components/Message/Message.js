import Tippy from '@tippyjs/react';
import React, { useState } from 'react';
import Avatar from '../Avatar';
import { OptionIcon, SolidHeartIcon } from '../Icons';
import { Wrapper } from './styled';
import * as messageSerVice from '~/services/messageService';

export default function Message({ message, onDelete, currentUser }) {
    const [isLiked, setIsLiked] = useState(
        message.likes.some((user) => user._id === currentUser?._id),
    );
    const [likes, setLikes] = useState(message.likes);
    const handleLike = async () => {
        await messageSerVice.like(message._id);
        setIsLiked(!isLiked);
        setLikes(
            isLiked
                ? likes.filter((user) => user._id !== currentUser?._id)
                : likes.concat(currentUser),
        );
    };
    const isTheirMessage = message.sender._id !== currentUser?._id;

    return (
        <Wrapper>
            <div
                className={
                    isTheirMessage
                        ? 'message-item message-item--their-message'
                        : 'message-item'
                }
            >
                <Avatar
                    src={message.sender.avatar}
                    width="3.2rem"
                    height="3.2rem"
                    alt="Avatar"
                    to={`/@${message.sender.username}`}
                />
                <div className="message-container">
                    <p className="message-text">{message.text}</p>
                </div>

                <Tippy
                    trigger="click"
                    interactive
                    placement="top"
                    hideOnClick
                    content={
                        <div className="message-option-tippy">
                            <span onClick={handleLike}>Like</span>
                            <span onClick={() => onDelete(message._id)}>
                                Delete
                            </span>
                        </div>
                    }
                >
                    <div className="message-option">
                        <OptionIcon width="2.4rem" height="2.4rem" />
                    </div>
                </Tippy>
            </div>

            {likes.length > 0 && (
                <div
                    className={
                        isTheirMessage
                            ? 'like-container like-container--their-message'
                            : 'like-container'
                    }
                >
                    <span className="like-icon icon-wrapper">
                        <SolidHeartIcon width="1.8rem" height="1.8rem" />
                    </span>
                    {likes.map((user) => (
                        <Tippy
                            placement="top"
                            content={user.username}
                            key={user._id}
                        >
                            <div className="avatar-wrapper">
                                <Avatar
                                    src={user.avatar}
                                    width="1.7rem"
                                    height="1.7rem"
                                />
                            </div>
                        </Tippy>
                    ))}
                </div>
            )}
        </Wrapper>
    );
}
