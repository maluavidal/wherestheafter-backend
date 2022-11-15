import BaseController from './BaseController';
import UserService from "../service/UserService";

class UserController extends BaseController {

	constructor() {
		super();

		this.index = this.index.bind(this);
		this.show = this.index.bind(this);
		this.store = this.store.bind(this);
		this.update = this.update.bind(this);
		this.delete = this.delete.bind(this);
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
			const user = await UserService.show(req.params);

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
			const user = await UserService.update(req.params);

			return this.handleSuccess(res, user);
		} catch (error) {
			return this.handleError(res, error);

		}
	}

	async delete(req, res) {
		try {
			const user = await UserService.delete(req.params);

			return this.handleSuccess(res, user);
		} catch (error) {
			return this.handleError(res, error);

		}
	}
}

export default new UserController();
