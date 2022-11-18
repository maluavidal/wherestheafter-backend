import multer from 'multer';
import dotenv from 'dotenv';
import express from 'express';

import './src/database/index';
import { UserRoutes } from './src/routes';
import { EventRoutes } from './src/routes';
import { ThumbRoutes } from './src/routes';
import { ClientRoutes } from './src/routes';
import { SessionRoutes } from './src/routes';
import { EventsClientsRoutes } from './src/routes';

import multerConfig from './src/config/multerConfig';

class App {
	constructor() {
		dotenv.config();

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
