import { Client } from "../models";

class ClientService {
	async list() {
		return Client.findAll({
			order: [['id', 'ASC']]
		});
	};

	async show(id) {
		const client = {
			where: {
				id
			}
		};

		return Client.findOne(client);
	};

	async store(data) {
			return Client.create(data);
	};

	async update({ changes, filter }) {
		return Client.update(changes, {
			where: {
				id: filter.id,
				deleted_at: null
			},
			returning: true
		})
	};

	async delete(id) {
		const client = {
			where: {
				id
			}
		}
		await Client.destroy(client);

		return true;
	};
}


export default new ClientService();
