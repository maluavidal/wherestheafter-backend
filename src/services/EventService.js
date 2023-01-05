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

	async paginateList(user_id, meta) {
		const limit = 5;
		const offset = (meta.page - 1) * limit;

		const promises = []
		const whereCondition = {
			user_id
		};

		if (meta.search_text) {
			whereCondition.name = {
				[Op.iLike]: `%${meta.search_text}%`
			};
		}

		if (meta.status) {
			whereCondition.status = meta.status;
		}

		if (meta.start_date && meta.end_date) {
			whereCondition.starts_at = {
				[Op.between]: [new Date(meta.start_date), new Date(meta.end_date)]
			};

		} else if (meta.start_date && !meta.end_date) {
			whereCondition.starts_at = {
				[Op.gte]: new Date(meta.start_date)
			};

		} else if (meta.end_date && !meta.start_date) {
			whereCondition.starts_at = {
				[Op.lte]: new Date(meta.start_date)
			};
		}

		promises.push(
			Event.findAll({
				where: whereCondition,
				offset,
				limit,
			})
		);

		if (meta.page === 1) {
			promises.push(
				Event.count({
					where: whereCondition
				})
			)
		}

		const [events, totalItems] = await Promise.all(promises);

		return {
			events,
			totalItems
		}
	}

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
			});

			event.thumb_id = fileCreated.id;

			if (event.starts_at > moment().format('DD/MM/YYYY')) {
				event.status = 'ongoing'
			} else if (event.ends_at < moment().format('DD/MM/YYYY')) {
				event.status = 'over'
			}

			console.log(event);

			return Event.create(event);
		};
	}

	async update({ changes, filter, actual_user }) {
		const eventToUpdate = await Event.findOne({
			where: {
				id: filter.id
			}
		});

		if (eventToUpdate.user_id !== actual_user) {
			throw new Error('Access denied.')
		}

		return eventToUpdate.update(changes, {
			where: {
				id: filter.id,
				deleted_at: null
			}
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
