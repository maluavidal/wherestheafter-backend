import dotenv from 'dotenv';

dotenv.config();

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
		this.app.use('/clients', ClientRoutes.setup());
		this.app.use('/session', SessionRoutes.setup());
		this.app.use('/users', UserRoutes.setup());
		this.app.use('/events', EventRoutes.setup());
		this.app.use('/eventsclients', EventsClientsRoutes.setup());
		this.app.use('/thumbs', ThumbRoutes.setup());
	}
}

export default new App().app;
