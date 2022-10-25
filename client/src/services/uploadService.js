import { httpRequest } from '~/utils/httpRequest';

export const uploadFile = async (path, file) => {
    try {
        const data = new FormData();
        data.append('video', file);
        const response = await httpRequest.post('upload/' + path, data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const uploadBase64File = async (base64File) => {
    try {
        const data = new FormData();
        data.append('base64Image', base64File);
        const response = await httpRequest.post('upload/base64-image', data);
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
