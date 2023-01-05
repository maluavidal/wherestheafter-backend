import { User, Event } from "../models";
import { Op } from 'sequelize';
import moment from 'moment';
const bcryptjs = require("bcryptjs");

class UserService {
	async list() {
		return User.findAll({
			order: [['id', 'ASC']]
		});
	};

	async profile(filter) {
		let whereFilter = {};

		// const date = moment(filter.starts_at).format('YYYY-MM-DD HH:mm:ss');
		// if (filter?.starts_at) {
		// 	const date =  moment(filter.starts_at).format('YYYY-MM-DD hh:mm:ss')
		// 	whereFilter = {
		// 		starts_at: {
		// 			[Op.iLike]: date
		// 		}
		// 	};
		// }

		// if (filter?.city) {
		// 	whereFilter.city = {
		// 		[Op.iLike]: `%${filter.city}%`
		// 	}
		// }

		// if (filter?.name) {
		// 	whereFilter.name = {
		// 		[Op.iLike]: `%${filter.name}%`,
		// 	}
		// }

		return Event.findAll({
			where: {
				user_id: filter.user_id,
				// starts_at: new Date('2022-12-31 22:00:00-03'),
				// city: filter.city,
				name: filter.name,
			},

		})
	}

	async show({ id }) {
		const user = {
			where: {
				id
			}
		};

		return User.findOne(user);
	};

	async perfilInfo(id) {
		const user = {
			where: {
				id
			}
		};

		return User.findOne(user);
	};

	async store(data) {
		const user = {
			where: {
				email: data.email
			},
			raw: true
		};

		const checkExistence = await User.count(user);
		if (checkExistence) {
			throw new ('Email ja existe')
		}

		return User.create(data);
	};

	async update({ changes, filter }) {
		const user = await User.findOne({
			where: {
				id: filter.id
			},
			raw: true
		})

		if (changes.password) {
			const passValid = bcryptjs.compareSync(changes.old_password, user.password_hash);
			if (!passValid) {
				throw new ('Senha invalida.')
			}
		}

		return User.update(changes, {
			where: {
				id: filter.id,
				deleted_at: null
			},
			individualHooks: true,
			returning: true
		})
	};

	async delete(id) {
		const user = {
			where: {
				id
			}
		}

		await User.destroy(user);

		return true;
	};
}

export default new UserService();
