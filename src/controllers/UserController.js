import BaseController from './BaseController';
import UserService from "../services/UserService";

class UserController extends BaseController {
	constructor() {
		super();

		this.bindActions(['index', 'profile', 'show', 'store', 'update', 'delete']);
	}

	async index(req, res) {
		try {
			const users = await UserService.list();

			return this.handleSuccess(res, users);
		} catch (error) {
			return this.handleError(res, error);
		}
	};

	async profile(req, res) {
		try {
			const id = req.userInfo.id

			const usersEvents = await UserService.profile(id, req.filter, req.query);
			console.log(req.query, 'query');

			return this.handleSuccess(res, usersEvents)
		} catch (error) {
			return this.handleError(res, error);
		}
	}

	async show(req, res) {
		try {
			const user = await UserService.show(req.userInfo);
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
				changes: req.data,
				filter:{
					id: req.userInfo.id
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
			await UserService.delete(req.filter.id);

			return this.handleSuccess(res, true);
		} catch (error) {
			return this.handleError(res, error);
		}
	}
}

export default new UserController();
