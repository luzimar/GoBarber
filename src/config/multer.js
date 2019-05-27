const path = require('path')
const crypto = require('crypto')
const multer = require('multer')

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, raw) => {
       if (err) return cb(err)
         file.key = `${hash.toString('hex')}-${file.originalname}`;
         cb(null, file.key);
      })
    }
  })
}
