import httpRequest from '~/utils/httpRequest';

export const search = async (query, options) => {
    try {
        const response = await httpRequest.get('/keywords', {
            query,
            ...options,
        });

        const searchResult = response.data.filter((keyword) =>
            keyword.title.toLowerCase().includes(query.toLowerCase()),
        );

        return searchResult;
    } catch (err) {
        console.log(err);
    }
};

export const get = async () => {
    try {
        const response = await httpRequest.get('/keywords');

        return response.data;
    } catch (err) {
        console.log(err);
    }
};
