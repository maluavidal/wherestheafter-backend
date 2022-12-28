import { EventsClient } from "../models";

class EventsClientService {
	async list() {
		return EventsClient.findAll({
			order: [['id', 'ASC']]
		});
	};

	async show(id) {
		const eventsClient = {
			where: {
				id
			}
		};

		return EventsClient.findOne(eventsClient);
	};

	async countConfirmedEvent(eventId) {
		const eventsClient = {
			where: {
				event_id: eventId
			}
		};

		return EventsClient.count(eventsClient);
	};

	async dailySoldTickets(eventId) {
		const eventsClient = {
			where: {
				event_id: eventId
			}
		};

		return EventsClient.findAll(eventsClient);
	};

	async store(data) {
		return EventsClient.create(data);
	};

	async update({ changes, filter }) {
		return EventsClient.update(changes, {
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
		await EventsClient.destroy(eventsClient);

		return true;
	};
}


export default new EventsClientService();
