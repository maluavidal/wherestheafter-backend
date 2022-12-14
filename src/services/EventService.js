import { Event, Thumb } from "../models";
import { Op } from 'sequelize';
import moment from 'moment';

class EventService {
	async list(filter) {
		const whereFilter = {
			starts_at: {
				[Op.gt]: moment(filter.start_at)
			},
			ends_at: {
				[Op.lt]: moment(filter.end_date)
			},
		};

		console.log(whereFilter, 'whereFilter')

		if (filter.city) {
			whereFilter.city = {
				[Op.iLike]: `%${filter.city}%`
			}
		}

		return Event.findAll({
			include: [{
				model: Thumb,
				attributes: ['file_name', 'original_name', 'url']
			}],
			order: [['id', 'ASC']],
			where: whereFilter
		});
	};

	async show(id) {
		console.log(id)
		return Event.findOne({
			where: {
				id
			},
			include: [{
				model: Thumb,
				attributes: ['file_name', 'original_name', 'url']
			}],
		});
	};

	async store({ event, file }) {
		const cep = require('cep-promise');
		const cepInfo = await cep(event.address_cep);

		const dataCreate = {
			...event,
			address_cep: cepInfo.cep,
			city: cepInfo.city,
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
