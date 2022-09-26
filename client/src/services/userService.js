import { authRequest, httpRequest } from '~/utils/httpRequest';

export const search = async (query, options) => {
    try {
        const response = await httpRequest.get(`users/`, {
            params: {
                query,
                ...options,
            },
        });

        const users = response.data.filter((user) =>
            user.full_name.toLowerCase().includes(query.toLowerCase()),
        );

        return users;
    } catch (err) {
        console.log(err);
    }
};

export const get = async () => {
    try {
        const response = await httpRequest.get('/users');
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const getMe = async () => {
    try {
        const response = await authRequest.get('/users/me');
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const post = async (user) => {
    try {
        const response = await httpRequest.post('/users', user);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const put = async (_id, updatedData) => {
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
        const response = await httpRequest.delete(`/users/${_id}/delete`, {
            _id,
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const follow = async (_id) => {
    try {
        const response = await authRequest.put('/users/follow', { _id });
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const unfollow = async (_id) => {
    try {
        const response = await authRequest.put('/users/unfollow', { _id });
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

// const userService = {};

// export default userService;
