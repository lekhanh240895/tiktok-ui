const express = require('express');
const UploadController = require('../controllers/UploadController');
const router = express.Router();
const {
    uploadImage,
    uploadVideo,
    uploadBase64Image,
} = require('../middlewares/multer');

router.post(
    '/video',
    uploadVideo.single('video'),
    UploadController.uploadVideo,
);
router.post(
    '/image',
    uploadImage.single('image'),
    UploadController.uploadImage,
);
router.post(
    '/base64-image',
    uploadBase64Image.single(),
    UploadController.uploadBase64Image,
);

module.exports = router;
