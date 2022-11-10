import dotenv from 'dotenv';

dotenv.config();

import './src/database/index';

import express from 'express';

import { UserRoutes } from './src/routes'
// import { resolve } from 'path';

// importar rotas

class App {
	constructor() {
		this.app = express();
		this.middlewares();
		this.routes();
	}

	middlewares() {

	}

	routes() {
		this.app.use('/users', UserRoutes);
		// this.app.use('/users', UserRoutes);
		// this.app.use('/users', UserRoutes);
		// this.app.use('/users', UserRoutes);
		// this.app.use('/users', UserRoutes);
	}
}

export default new App().app;
