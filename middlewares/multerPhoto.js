const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '../uploads/photo'));
  },
  filename: (req, file, callback) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    callback(null, Date.now() + '-' + fileName);
  },
});

const photoUpload = multer({ storage });

module.exports = photoUpload;
