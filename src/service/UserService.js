import { User } from "../models";

class UserService {
	async list() {
		try {
			return User.findAll({
				order: [['id', 'ASC']]
			});
		} catch (error) {
			console.log(error);
			throw new Error(error);
		}
	};

	async show(req, res) {
		try {
		const { id } = req.params;

		const user = User.findByPk(id);

			if (!user) {
				return res.status(400).json({
					errors: ['This user does not exist.'],
				});
			};

			return res.json(user);
		} catch (error) {
			console.log(error);
			throw new Error(error);
		}
	};

	async store(data) {
		try {
			return User.create(data);

		} catch (error) {
			console.log(error);
			throw new Error(error);
		}
	};

	async update(req, res) {
		try {
		const { id } = req.params;

		const user = User.findByPk(id);

			if (!user) {
				return res.status(400).json({
					errors: ['This user does not exist.'],
				});
			};

			const updatedUser = await user.update(req.body);

			return res.json(updatedUser);
		} catch (error) {
			console.log(error);
			throw new Error(error);
		}
	};

	async delete(req, res) {
		try {
		const { id } = req.params;

		const user = User.findByPk(id);

			if (!user) {
				return res.status(400).json({
					errors: ['This user does not exist.'],
				});
			};

			await user.destroy();

			return res.json({
				deleted: true,
			});
		} catch (error) {
			console.log(error);
			throw new Error(error);
		}
	};
}


export default new UserService();
