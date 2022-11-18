import BaseController from './BaseController';
import UserService from "../service/UserService";

class UserController extends BaseController {
	constructor() {
		super();

		this.bindActions(['index', 'show', 'store', 'update', 'delete']);
	}

	async index(req, res) {
		try {
			const users = await UserService.list();

			return this.handleSuccess(res, users);
		} catch (error) {
			return this.handleError(res, error);
		}
	};

	async show(req, res) {
		try {
			const user = await UserService.show(req.filter.id);

			return this.handleSuccess(res, user);
		} catch (error) {
			return this.handleError(res, error);
		}
	};

	async store(req, res) {
		try {
			const user = await UserService.store(req.data);

			return this.handleSuccess(res, user);
		} catch (error) {
			return this.handleError(res, error);
		}
	}

	async update(req, res) {
		try {
			const options = {
				changes: req.body,
				filter:{
					id: req.params.id
				}
			};

			const user = await UserService.update(options);
			return this.handleSuccess(res, user);
		} catch (error) {
			return this.handleError(res, error);

		}
	}

	async delete(req, res) {
		try {
			await UserService.delete(req.params.id);

			return this.handleSuccess(res, true);
		} catch (error) {
			return this.handleError(res, error);
		}
	}
}

export default new UserController();
