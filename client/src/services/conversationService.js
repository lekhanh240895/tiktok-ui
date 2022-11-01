import { authRequest, httpRequest } from '~/utils/httpRequest';

// Get conversations of a user
export const getUserConversations = async (userID) => {
    const response = await httpRequest.get(`conversations/${userID}`);
    return response.data;
};

// Get a conversations
export const getConversation = async (id) => {
    const response = await httpRequest.get(`conversations/`);
    return response.data;
};

// Create a conversation
export const create = async (receiverID) => {
    try {
        const response = await authRequest.post(`conversations`, {
            receiverID,
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

// Get messages of a conversation
export const remove = async (conversationID) => {
    try {
        const response = await authRequest.delete(
            `conversations/${conversationID}`,
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};
