const multer = require('multer');

//specify the storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const storageVideo = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/videos');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb({ message: 'Unsupported File Format' }, false);
    }
};

const fileFilterVideo = (req, file, cb) => {
    const extension = file.mimetype.split('/')[0];
    if (extension !== 'video') {
        return cb(new Error('Unsupported File Format'), false);
    }

    cb(null, true);
};

const uploadImage = multer({
    storage: storage,
    limits: { fileSize: 4096 * 4096 },
    fileFilter: fileFilter,
});

const uploadVideo = multer({
    storage: storageVideo,
    fileFilter: fileFilterVideo,
});

const uploadBase64Image = multer();

module.exports = { uploadImage, uploadBase64Image, uploadVideo };
