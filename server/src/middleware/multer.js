import multer from 'multer';

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image'); // 'image' must match the field name in FormData

export default multerUploads;