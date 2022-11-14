import BaseController from './BaseController';
import UserService from "../service/UserService";

class UserController extends BaseController {
	// async index(req, res) {
	// 	const users = await User.findAll({
	// 		attributes: ['id', 'name', 'email', 'is_admin'],
	// 		order: [['id', 'ASC']]
	// 	});

	// 	res.json(users);
	// }

	constructor() {
		super();

		this.store = this.store.bind(this);
	}

	async store(req, res) {
		try {
			const user = await UserService.store(req.data);
			console.log(user);
			return this.handleSuccess(res, user);
		} catch (error) {
			return this.handleError(res, error);
		}
	}
}

export default new UserController();
