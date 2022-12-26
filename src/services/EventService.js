import { Event, Thumb } from "../models";
import { Op } from 'sequelize';
import moment from 'moment';
import cep from 'cep-promise';

class EventService {
	async list(filter) {
		let whereFilter = {};

		if (filter?.starts_at && filter.ends_at) {
			whereFilter = {
				starts_at: {
					[Op.gt]: moment(filter.starts_at)
				},
				ends_at: {
					[Op.lt]: moment(filter.ends_at)
				},
			};
		}

		if (filter?.city) {
			whereFilter.city = {
				[Op.iLike]: `%${filter.city}%`
			}
		}

		if (filter?.name) {
			whereFilter.name = {
				[Op.iLike]: `%${filter.name}%`,
			}
		}

		return Event.findAll({
			include: [{
				model: Thumb,
				attributes: ['file_name', 'original_name', 'url']
			}],
			order: [['id', 'ASC']],
			where: whereFilter,
			limit: 12,
		});
	};

	async listCities() {
		let cities = await Event.findAll({
			attributes: ['city']
		});

		const locations = [];

		cities = cities.forEach(event => {
			const location = event.city

			if (locations.includes(location)) {
				return;
			} else {
				locations.push(location)
			}
		});

		return locations;
	};

	async show(id) {
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
		if (file) {
			const fileCreated = await Thumb.create({
				file_name: file.filename,
				original_name: file.originalname,
				url: file.path
			}, { returning: true });

			event.thumb_id = fileCreated.id;
		}

		return Event.create(event);
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

	async getCep(cepData) {
		const cepInfo = await cep(cepData);

		return cepInfo;
	};
}


export default new EventService();
