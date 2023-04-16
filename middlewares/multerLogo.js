const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '../uploads/logo'));
  },
  filename: (req, file, callback) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    callback(null, Date.now() + '-' + fileName);
  },
});

const logoUpload = multer({ storage });

module.exports = logoUpload;
