import { authRequest, httpRequest } from '~/utils/httpRequest';

export const getVideos = async () => {
    const response = await httpRequest.get('videos');
    return response.data;
};

export const getVideo = async (_id) => {
    try {
        const response = await httpRequest.get(`videos/${_id}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const create = async (video) => {
    const response = await authRequest.post(`videos`, video);
    return response.data;
};

export const update = async (updatedVideo) => {
    try {
        const response = await authRequest.put(
            `/videos/${updatedVideo._id}/update`,
            updatedVideo,
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const remove = async (id) => {
    try {
        const response = await authRequest.delete(`videos/${id}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const like = async (id) => {
    try {
        const response = await authRequest.put(`videos/${id}/like`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};
