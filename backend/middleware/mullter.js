import multer from 'multer'
import path from 'path'

const multerUpload = multer({
  storage: multer.diskStorage({}),
  fileFilter: function (req, file, cb) {
    console.log('MULTER', file)
    let extension = path.extname(file.originalname)
    if (extension !== '.jpg' && extension !== '.jpeg' && extension !== '.png') {
      // cb(new Error('File extension not supported'), false)
      console.log('extension checked')
    } else {
      console.log('all good')
      cb(null, true)
    }
  },
})
export { multerUpload }
