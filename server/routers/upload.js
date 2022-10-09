const express = require('express');
const UploadController = require('../controllers/UploadController');
const router = express.Router();
const { uploadImage, uploadVideo } = require('../middlewares/multer');

router.post(
    '/video',
    uploadVideo.single('video'),
    UploadController.uploadVideo,
);
router.post(
    '/image',
    uploadVideo.single('image'),
    UploadController.uploadImage,
);

module.exports = router;
