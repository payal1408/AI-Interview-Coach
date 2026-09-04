import multer from 'multer'

const upload = multer({
    storage: multer.memoryStorage(),
    limits: 3 * 1024 * 1024 //3MB
})
export default upload