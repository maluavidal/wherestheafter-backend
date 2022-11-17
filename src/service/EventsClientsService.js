import { EventsClients } from "../models";

class EventsClientsService {
	async list() {
		return EventsClients.findAll({
			order: [['id', 'ASC']]
		});
	};

	async show(id) {
		const eventsClient = {
			where: {
				id
			}
		};

		return EventsClients.findOne(eventsClient);
	};

	async store(data) {
		return EventsClients.create(data);
	};

	async update({ changes, filter }) {
		return EventsClients.update(changes, {
			where: {
				id: filter.id,
				deleted_at: null
			},
			returning: true
		})
	};

	async delete(id) {
		const eventsClient = {
			where: {
				id
			}
		}
		await EventsClients.destroy(eventsClient);

		return true;
	};
}


export default new EventsClientsService();
