import { authRequest, httpRequest } from '~/utils/httpRequest';

// Get notifications of a user
export const get = async (userID) => {
    const response = await httpRequest.get(`notifications/${userID}`);
    return response.data;
};

// Create a notifications
export const create = async (data) => {
    try {
        const response = await authRequest.post(`notifications`, data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

// Delete a notification
export const remove = async (notificationID) => {
    const response = await authRequest.delete(
        `notifications/${notificationID}`,
    );
    return response.data;
};
