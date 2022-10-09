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
}

module.exports = new UploadController();
