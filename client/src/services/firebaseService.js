import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytesResumable,
    uploadString,
} from 'firebase/storage';
import { storage } from '~/firebase/config';
const mime = require('mime');

export const uploadFileFirebase = (path, file) => {
    return new Promise((resolve, reject) => {
        const extension = file.name.split('.')[1];
        const type = mime.getType(extension);
        const fileName = Date.now() + '-' + file.name;
        const metadata = {
            contentType: type,
        };
        const storageRef = ref(storage, path + fileName);

        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                reject(error);
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            },
        );
    });
};

export const uploadDataUrlFirebase = (path, dataUrlString) => {
    return new Promise(async (resolve, reject) => {
        const type = dataUrlString.split(';base64,')[0].replace('data:', '');
        const extension = mime.getExtension(type);
        const fileName = `${Date.now()}-upload_img.${extension}`;

        const storageRef = ref(storage, path + fileName);
        const uploadTask = await uploadString(
            storageRef,
            dataUrlString,
            'data_url',
        );
        getDownloadURL(uploadTask.ref)
            .then((downloadURL) => {
                resolve(downloadURL);
            })
            .catch((err) => reject(err));
    });
};
export const handleDeleteFilesFirebase = (urls = [''] || '') => {
    let promises = [];

    if (Array.isArray(urls)) {
        return urls.forEach((url) => {
            const storageRef = ref(storage, url);
            promises.push(deleteObject(storageRef));
        });
    } else {
        const storageRef = ref(storage, urls);
        promises.push(deleteObject(storageRef));
    }

    Promise.all(promises)
        .then(() => {
            console.log('File deleted');
        })
        .catch((err) => console.log(err));
};
