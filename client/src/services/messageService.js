import { authRequest, httpRequest } from '~/utils/httpRequest';

// // Get messages of a conversation
export const getAll = async () => {
    const response = await httpRequest.get(`messages`);
    return response.data;
};

// Get messages of a conversation
export const get = async (conversationID) => {
    const response = await httpRequest.get(`messages/${conversationID}`);
    return response.data;
};

// Create a message
export const create = async (data) => {
    try {
        const response = await authRequest.post(`messages`, data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

// Like a message
export const like = async (id) => {
    try {
        const response = await authRequest.put(`messages/${id}/like`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const update = async (id, data) => {
    try {
        const response = await authRequest.put(`/messages/${id}/update`, data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const remove = async (id) => {
    try {
        const response = await authRequest.delete(`messages/${id}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};
