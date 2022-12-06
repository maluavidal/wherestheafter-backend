import dotenv from 'dotenv';
import express from 'express';
import routes from './src/routes'
import cors from 'cors';

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
		this.app.use(cors());
		this.app.use(express.static(`${__dirname}/src/uploads`));
	}

	routes() {
		this.app.use(routes.setup())
	}
}

export default new App().app;
