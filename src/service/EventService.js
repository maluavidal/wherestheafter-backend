import { Event } from "../models";

class EventService {
	async list() {
		return Event.findAll({
			order: [['id', 'ASC']]
		});
	};

	async show(id) {
		const event = {
			where: {
				id
			}
		};

		return Event.findOne(event);
	};

	async store(data) {
		try {
			const dataCreate = {
				...data,
				starts_at: new Date(data.starts_at)
			}
			console.log(dataCreate, 'data mp servoc')
			return Event.create(dataCreate);
		} catch(err) {
			console.log(err, 'err')
		}

	};

	async update({ changes, filter }) {
		return Event.update(changes, {
			where: {
				id: filter.id,
				deleted_at: null
			},
			returning: true
		})
	};

	async delete(id) {
		const event = {
			where: {
				id
			}
		}
		await Event.destroy(event);

		return true;
	};
}


export default new EventService();
