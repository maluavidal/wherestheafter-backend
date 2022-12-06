import { Event, Thumb } from "../models";

class EventService {
	async list() {
		return Event.findAll({
			include: [{
				model: Thumb,
				attributes: ['file_name', 'original_name', 'url']
			}],
			order: [['id', 'ASC']]
		});
	};

	async show(id) {
		return Event.findOne({
				include: [{
					model: Thumb,
					attributes: ['file_name', 'original_name', 'url']
				}],
			order: [['id', 'ASC']],
			where: {
				id
			}
		});
	};

	async store({ event, file }) {
		const cep = require('cep-promise');
		const cepInfo = await cep(event.address_cep);

		const dataCreate = {
			...event,
			address_cep: cepInfo.cep,
			address_city: cepInfo.city,
			starts_at: new Date(event.starts_at)
		};

		if (file) {
			console.log(file, 'file')
			const fileCreated = await Thumb.create({
				file_name: file.filename,
				original_name: file.originalname,
				url: file.path
			}, { returning: true });

			dataCreate.thumb_id = fileCreated.id;
		}


//  get() {
// 	return `src/uploads/image/${this.file_name}`;
//   },

		return Event.create(dataCreate);
	};

	update({ changes, filter }) {
		return Event.update(changes, {
				include: [{
					model: Thumb,
					attributes: ['file_name', 'original_name', 'url']
				}],
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
