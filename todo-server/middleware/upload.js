const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadToFirebase = async (req, res, next) => {
    if (req.file) {
        try {
            const username = req.user.uid;
            const fileName = `${username}/${Date.now()}_${req.file.originalname}`;
            const file = bucket.file(fileName);
            const stream = file.createWriteStream({
                metadata: { contentType: req.file.mimetype },
            });
            stream.on("error", (err) => {
                console.error("Upload Error:", err);
                return res.status(500).json({ message: "Upload failed", error: err.message });
            });
            stream.on("finish", async () => {
                await file.makePublic();
                req.file.firebaseUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
                next();
            });
            stream.end(req.file.buffer);
        } catch (error) {
            return res.status(500).json({ message: "Upload failed", error: error.message });
        }
    }
    else next();

};

module.exports = { upload, uploadToFirebase };
