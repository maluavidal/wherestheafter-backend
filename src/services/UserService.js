import { User, Event } from "../models";

class UserService {
	async list() {
		return User.findAll({
			order: [['id', 'ASC']]
		});
	};

	async profile({id}) {
		return Event.findAll({
			where: {
				user_id: id,
			},
			paranoid: false
		})
	}

	async show({id}) {
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
		return User.create(data);
	};

	async update({ changes, filter }) {
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
