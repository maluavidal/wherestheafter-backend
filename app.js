import dotenv from 'dotenv';

dotenv.config();

import multer from 'multer';

const random = () => Math.floor(Math.random() * 10000 + 10000);

import { resolve, extname } from 'path';

const multerConfig = {
	fileFilter: (req, file, cb) => {
		if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
			return cb(new multer.MulterError('Archive must be PNG or JPG.'));
		}

		return cb(null, true);
	},
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, resolve(__dirname, 'uploads'));
		},
		filename: (req, file, cb) => {
			cb(null, `${Date.now()}_${random()}${extname(file.originalname)}`);
		},
	})
};

import './src/database/index';

import express from 'express';

import { UserRoutes } from './src/routes';
import { ClientRoutes } from './src/routes';
import { SessionRoutes } from './src/routes';
import { EventRoutes } from './src/routes';
import { EventsClientsRoutes } from './src/routes';
import { ThumbRoutes } from './src/routes';

 // import { resolve } from 'path';

class App {
	constructor() {
		this.app = express();
		this.middlewares();
		this.routes();
	}

	middlewares() {
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(express.json());
	}

	routes() {
		const upload = multer(multerConfig);

		this.app.use('/clients', ClientRoutes.setup());
		this.app.use('/session', SessionRoutes.setup());
		this.app.use('/users', UserRoutes.setup());
		this.app.use('/events', EventRoutes.setup(upload));
		this.app.use('/eventsclients', EventsClientsRoutes.setup());
		this.app.use('/thumbs', ThumbRoutes.setup());
	}
}

export default new App().app;
