import { authRequest, httpRequest } from '~/utils/httpRequest';

export const searchUser = async (query) => {
    try {
        const response = await authRequest.get(`users/search?q=${query}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const getUsers = async () => {
    try {
        const response = await httpRequest.get('users');
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const getUser = async (id) => {
    try {
        const response = await httpRequest.get(`users/${id}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const getUserByUsername = async (username) => {
    try {
        const response = await httpRequest.get(`users/${username}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const update = async (_id, formData) => {
    const response = await authRequest.put(`/users/${_id}`, formData);
    return response.data;
};

export const remove = async (_id) => {
    try {
        const response = await httpRequest.delete(`users/${_id}/delete`, {
            _id,
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const follow = async (_id) => {
    try {
        const response = await authRequest.put('users/follow', { _id });
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const unfollow = async (_id) => {
    try {
        const response = await authRequest.put('users/unfollow', { _id });
        return response.data;
    } catch (err) {
        console.log(err);
    }
};
