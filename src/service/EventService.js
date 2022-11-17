import { Event, Thumb } from "../models";

class EventService {
	async list() {
		// estudar scope
		return Event.scope('withThumb').findAll({
			order: [['id', 'ASC']]
		});
	};

	async show(id) {
		return Event.scope('withThumb').findOne({
			where: {
				id
			}
		});
	};

	async store({ event, file }) {
		try {
			const dataCreate = {
				...event,
				starts_at: new Date(event.starts_at)
			};

			if (file) {
				const fileCreated = await Thumb.create({
					file_name: file.filename,
					original_name: file.originalname,
					url: file.path
				}, { returning: true });

				dataCreate.thumb_id = fileCreated.id;
			}

			return Event.create(dataCreate);
		} catch(err) {
			console.log(err, 'err')
		}
	};

	update({ changes, filter }) {
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
