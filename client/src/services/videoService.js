import { authRequest, httpRequest } from '~/utils/httpRequest';

export const getVideos = async () => {
    try {
        const response = await httpRequest.get('videos');
        return response.data;
    } catch (err) {
        console.log(err);
    }
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
    try {
        const response = await httpRequest.post(`videos`, video);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const update = async (id, updatedData) => {
    try {
        const response = await authRequest.put(
            `/videos/${id}/update`,
            updatedData,
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const remove = async (id) => {
    try {
        const response = await httpRequest.delete(`videos/${id}/delete`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const like = async (_id) => {
    try {
        const response = await authRequest.put(`videos/${_id}/like`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};
