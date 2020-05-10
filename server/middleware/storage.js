const multer = require('multer')
const path = require('path')

// Storage for Images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'server/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    },
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      if (ext !== '.jpg' || ext !== '.png') {
        return cb(res.status(400).end('only jpg,png are allowed'), false)
      }
      cb(null, true)
    }
  
  })
  
  const upload = multer({ storage: storage }).single('file')
  module.exports = upload