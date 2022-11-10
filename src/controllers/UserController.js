import User from "../models/User";

class UserController {
	async index(req, res) {
		const users = await User.findAll({
			attributes: ['id', 'name', 'email', 'is_admin'],
			order: [['id', 'ASC']]
		});

		res.json(users);
	}

	async store(req, res) {
		console.log(req.userInfo, 'req.userInfo');

		res.json({
			user: req.userInfo
		})
	}
}

export default new UserController();
