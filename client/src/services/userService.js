import httpRequest from '~/utils/httpRequest';

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
