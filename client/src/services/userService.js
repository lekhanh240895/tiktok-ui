import { authRequest, httpRequest } from '~/utils/httpRequest';

export const search = async (query, options) => {
    try {
        const response = await httpRequest.get(`users/`, {
            params: {
                query,
                ...options,
            },
        });

        const users = response.data.filter(
            (user) =>
                user.full_name.toLowerCase().includes(query.toLowerCase()) ||
                user.username.toLowerCase().includes(query.toLowerCase()),
        );

        return users;
    } catch (err) {
        console.log(err);
    }
};

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

export const update = async (_id, updatedData) => {
    try {
        const response = await authRequest.put(
            `/users/${_id}/update`,
            updatedData,
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
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
