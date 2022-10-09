import { httpRequest } from '~/utils/httpRequest';

export const uploadVideo = async (video) => {
    try {
        const response = await httpRequest.post('upload/video', video);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const uploadImage = async (image) => {
    try {
        const response = await httpRequest.post('upload/image', image);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const dataUrlToFile = async (dataUrl, fileName) => {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return new File([blob], fileName, { type: 'image/jpeg' });
};
