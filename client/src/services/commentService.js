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

export const update = async (videoID, commentID, data) => {
    try {
        const response = await authRequest.put(
            `/comments/${videoID}/${commentID}/update`,
            data,
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

// export const remove = async (id) => {
//     try {
//         const response = await httpRequest.delete(`videos/${id}/delete`);
//         return response.data;
//     } catch (err) {
//         console.log(err);
//     }
// };

export const like = async ({ videoID, commentID }) => {
    try {
        const response = await authRequest.put(
            `comments/${videoID}/${commentID}/like`,
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};
