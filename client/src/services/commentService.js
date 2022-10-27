import { authRequest, httpRequest } from '~/utils/httpRequest';

export const get = async (videoID) => {
    const response = await httpRequest.get(`comments/${videoID}`);
    return response.data;
};

export const create = async ({ videoID, text }) => {
    try {
        const response = await authRequest.post(`comments/${videoID}`, {
            text,
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const update = async (commentID, data) => {
    try {
        const response = await authRequest.put(
            `/comments/${commentID}/update`,
            data,
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const like = async (commentID) => {
    try {
        const response = await authRequest.put(`comments/${commentID}/like`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const remove = async (commentID) => {
    try {
        const response = await authRequest.delete(
            `comments/${commentID}/delete`,
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};
