import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '~/components/Avatar';
import Button from '~/components/Button';
import { CheckedIcon, EmojiIcon, SolidMessageIcon } from '~/components/Icons';
import Message from '~/components/Message';
import { authSelector } from '~/redux/selectors';
import * as messageService from '~/services/messageService';
import { Wrapper } from './styled';

export default function Chatbox({ selectedConversation, socket }) {
    const messageRef = useRef();
    const messageList = useRef();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const { currentUser } = useSelector(authSelector);

    useEffect(() => {
        socket.on('getMessage', (data) => {
            setArrivalMessage(data);
        });
    }, [socket]);

    useEffect(() => {
        if (
            arrivalMessage &&
            selectedConversation.members.some(
                (member) => member._id === arrivalMessage?.sender._id,
            )
        )
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, selectedConversation]);

    useEffect(() => {
        messageList.current.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
    }, [messages]);

    // Get conversation's messages
    useEffect(() => {
        (async () => {
            if (selectedConversation) {
                const messages = await messageService.get(
                    selectedConversation._id,
                );
                setMessages(messages);
            }
        })();
    }, [selectedConversation]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const receiver = selectedConversation?.members.find(
            (member) => member._id !== currentUser._id,
        );
        const res = await messageService.create({
            receiverID: receiver._id,
            text: message,
            conversation: selectedConversation._id,
        });
        const newMessage = { ...res, sender: currentUser };

        socket.emit('sendMessage', {
            ...newMessage,
            receiverID: receiver._id,
        });

        setMessages((prev) => [...prev, newMessage]);
        setMessage('');
    };

    const handleDelete = async (id) => {
        await messageService.remove(id);
        const newMessages = messages.filter((message) => message._id !== id);
        setMessages(newMessages);
    };

    const receiver = selectedConversation?.members.find(
        (member) => member._id !== currentUser?._id,
    );

    return (
        <Wrapper>
            <div className="chatbox-header">
                <Avatar
                    src={receiver?.avatar}
                    width="5.6rem"
                    height="5.6rem"
                    alt="Avatar"
                    to={`/@${receiver?.username}`}
                />
                <Link to={`/@${receiver?.username}`}>
                    <div className="chat-user-info">
                        <h4 className="chat-user__name">
                            {receiver?.full_name}
                            {receiver?.tick && (
                                <span className="check icon-wrapper">
                                    <CheckedIcon
                                        width="1.4rem"
                                        height="1.4rem"
                                    />
                                </span>
                            )}
                        </h4>
                        <p className="chat-user__username">
                            {`@${receiver?.username}`}
                        </p>
                    </div>
                </Link>
            </div>
            <div className="messages-wrapper">
                <ul className="message-list" ref={messageList}>
                    {messages.map((message) => {
                        return (
                            <Message
                                key={message._id}
                                message={message}
                                onDelete={handleDelete}
                                currentUser={currentUser}
                            />
                        );
                    })}
                </ul>
            </div>
            <div className="chatbox-bottom">
                <form className="add-message-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            ref={messageRef}
                            type="text"
                            placeholder="Send a message..."
                            className="form-control"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <span className="emoji-button icon-wrapper">
                            <EmojiIcon width="2.4rem" height="2.4rem" />
                        </span>
                    </div>
                    {message && (
                        <Button type="submit" className="post-message-btn">
                            <SolidMessageIcon width="3.2rem" height="3.2rem" />
                        </Button>
                    )}
                </form>
            </div>
        </Wrapper>
    );
}
