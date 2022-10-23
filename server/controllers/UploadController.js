const fs = require('fs');
const mime = require('mime');
class UploadController {
    async uploadVideo(req, res, next) {
        try {
            res.status(200).json(req.file);
        } catch (err) {
            res.status(500).json({ error: err });
            next();
        }
    }
    async uploadImage(req, res, next) {
        try {
            res.status(200).json(req.file);
        } catch (err) {
            res.status(500).json({ error: err });
            next();
        }
    }
    async uploadBase64Image(req, res, next) {
        const base64Data = req.body.base64Image;
        const base64Image = base64Data.split(';base64,')[1];
        const type = base64Data.split(';base64,')[0].replace('data:', '');
        const extension = mime.getExtension(type);
        const imageBuffer = Buffer.from(base64Image, 'base64');
        const fileName = Date.now() + '-' + 'upload.' + extension;
        const path = __dirname.replace('controllers', '');

        try {
            fs.writeFileSync(path + '/public/images/' + fileName, imageBuffer);
            return res.status(200).json(fileName);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new UploadController();
