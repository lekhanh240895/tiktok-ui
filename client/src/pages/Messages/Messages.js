import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConversationItem from '~/components/ConversationItem';
import { SettingIcon2 } from '~/components/Icons';
import Header from '~/layouts/components/Header';
import { appSelector, authSelector } from '~/redux/selectors';
import { Wrapper } from './styled';
import * as messageService from '~/services/messageService';
import * as conversationService from '~/services/conversationService';
import appSlice from '~/redux/slices/appSlice';
import Chatbox from '~/components/Chatbox/Chatbox';

export default function Messages() {
    const [conversations, setConversations] = useState([]);
    const { currentUser } = useSelector(authSelector);
    const { selectedConversationID, onlineUsers } = useSelector(appSelector);
    const dispatch = useDispatch();

    // Get user's conversations
    useEffect(() => {
        (async () => {
            if (currentUser) {
                const conversations =
                    await conversationService.getUserConversations(
                        currentUser?._id,
                    );
                setConversations(conversations);
            }
        })();
    }, [currentUser]);

    useEffect(() => {
        if (conversations.length > 0 && !selectedConversationID) {
            dispatch(
                appSlice.actions.setSelectedConversationID(
                    conversations[0]._id,
                ),
            );
        }
    }, [conversations, selectedConversationID, dispatch]);

    useEffect(() => {
        return () => {
            if (conversations.length > 0) {
                conversations.forEach(async (conversation) => {
                    const messages = await messageService.get(conversation._id);
                    if (messages.length === 0) {
                        await conversationService.remove(conversation._id);
                    }
                });
            }
        };
    }, [conversations]);

    const selectedConversation = conversations.find(
        (conversation) => conversation._id === selectedConversationID,
    );

    const toTime = (timestamp) => new Date(timestamp);
    const orderedConversations = conversations.sort(
        (a, b) => toTime(b.createdAt) - toTime(a.createdAt),
    );

    const handleDeleteConversation = async (conversationID) => {
        await conversationService.remove(conversationID);
        const newConversations = conversations.filter(
            (conversation) => conversation._id !== conversationID,
        );
        setConversations(newConversations);
        if (newConversations.length > 0) {
            dispatch(
                appSlice.actions.setSelectedConversationID(
                    newConversations[0]._id,
                ),
            );
        }
    };

    return (
        <Wrapper>
            <Header />

            <div className="container">
                <div className="sidebar">
                    <div className="sidebar-header">
                        <h4 className="title">Messages</h4>
                        <span className="icon-wrapper">
                            <SettingIcon2 width="3.2rem" height="3.2rem" />
                        </span>
                    </div>

                    <ul className="chat-list">
                        {orderedConversations.length > 0 &&
                            orderedConversations.map((conversation) => {
                                const user = conversation.members.find(
                                    (member) => member._id !== currentUser?._id,
                                );
                                const isOnline = onlineUsers.some(
                                    (u) => u.userID === user._id,
                                );

                                return (
                                    <ConversationItem
                                        onDeleteConversation={
                                            handleDeleteConversation
                                        }
                                        user={user}
                                        isOnline={isOnline}
                                        key={conversation._id}
                                        conversation={conversation}
                                        onSelectedConversation={() =>
                                            dispatch(
                                                appSlice.actions.setSelectedConversationID(
                                                    conversation._id,
                                                ),
                                            )
                                        }
                                        active={
                                            selectedConversationID ===
                                            conversation._id
                                        }
                                    />
                                );
                            })}
                    </ul>
                </div>
                <div className="content">
                    {selectedConversationID && (
                        <Chatbox selectedConversation={selectedConversation} />
                    )}
                </div>
            </div>
        </Wrapper>
    );
}
