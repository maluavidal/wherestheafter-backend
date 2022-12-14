import multer from 'multer';
import { extname, resolve } from 'path';

const random = () => Math.floor(Math.random() * 10000 + 10000);

export default {
	fileFilter: (req, file, cb) => {
		if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg') {
			return cb(new Error('Archive must be PNG, JPEG or JPG.'));
		}

		return cb(null, true);
	},
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			return cb(null, resolve(__dirname, '..', 'uploads', 'image'));
		},
		filename: (req, file, cb) => {
			return cb(null, `${Date.now()}_${random()}${extname(file.originalname)}`);
		},
	})
};
