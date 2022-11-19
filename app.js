import dotenv from 'dotenv';
import express from 'express';
import routes from './src/routes'

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
		this.app.use(routes.setup())
	}
}

export default new App().app;
