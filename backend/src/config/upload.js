const multer = require('multer');
const path = require('path');

function fileNameFunction(req, file, callback) {
  const ext = path.extname(file.originalname);
  const name = path.basename(file.originalname, ext);
  const fileName = `${name}`
    +`-${Date.now()}`
    + `${ext}`;

  callback(null, fileName);
}

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(
      __dirname, '..', '..', 'uploads'
    ),
    filename: fileNameFunction,
  }),
};
