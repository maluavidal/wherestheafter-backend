import dotenv from 'dotenv';

dotenv.config();

import './src/database/index';

import express from 'express';
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

	}
}

export default new App().app;
