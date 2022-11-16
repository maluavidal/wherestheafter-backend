import PhotoController from './PhotoController';
import PhotoService from "../service/PhotoService";

// const upload = multer(multerConfig).single('file');

class UserController extends PhotoController {

	constructor() {
		super();

		this.bindActions(['index', 'show', 'store', 'update', 'delete']);
	}

	async index(req, res) {
		try {
			const users = await PhotoService.list();

			return this.handleSuccess(res, users);
		} catch (error) {
			return this.handleError(res, error);
		}
	};

	async show(req, res) {
		try {
			const user = await PhotoService.show(req.params);

			return this.handleSuccess(res, user);
		} catch (error) {
			return this.handleError(res, error);
		}
	};

	async store(req, res) {
		try {
			const user = await PhotoService.store(req.data);

			return this.handleSuccess(res, user);
		} catch (error) {
			return this.handleError(res, error);
		}
	}

	async update(req, res) {
		try {
			const user = await PhotoService.update(req.params);

			return this.handleSuccess(res, user);
		} catch (error) {
			return this.handleError(res, error);

		}
	}

	async delete(req, res) {
		try {
			const user = await PhotoService.delete(req.params);

			return this.handleSuccess(res, user);
		} catch (error) {
			return this.handleError(res, error);

		}
	}
}

export default new UserController();
