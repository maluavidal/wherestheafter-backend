import { Client } from "../models";

class ClientService {
	async list() {
        try {
			return Client.findAll({
				order: [['id', 'ASC']]
			});
		} catch (error) {
			console.log(error);
			throw new Error(error);
		}
    };

	async show(req, res) {
		try {
			const id = req.params;

			const client = Client.findByPk(id);

				if (!client) {
					return res.status(400).json({
						errors: ['This client does not exist.'],
					});
				};

				return res.json(client);
			} catch (error) {
				console.log(error);
				throw new Error(error);
			}
	}

	async store(data) {
		return Client.create(data);
	}

	async update({ changes, filter }) {
		return Client.update(changes, {
			where: {
				id: filter.id,
				deleted_at: null
			},
			returning: true
		});
	};

	async delete(id) {
		const destroyOptions = {
			where: {
				id
			}
		};

		await Client.destroy(destroyOptions);

		return true;
	};
}

export default new ClientService();
