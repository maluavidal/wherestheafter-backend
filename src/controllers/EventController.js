import BaseController from './BaseController';
import EventService from '../services/EventService';

class EventController extends BaseController {
	constructor() {
		super();

		this.bindActions(['index', 'listCities', 'show', 'store', 'update', 'delete', 'getAddress']);
	};

    async index(req, res) {
        try {
			const events = await EventService.list(req.filter);

			return this.handleSuccess(res, events);
		} catch (error) {
			return this.handleError(res, error);
		}
    };

	async listCities(req, res) {
		try {
			const cities = await EventService.listCities(req.filter);

			return this.handleSuccess(res, cities);
		} catch {
			return this.handleError(res, error);
		}
	};

    async show(req, res) {
        try {
			const event = await EventService.show(req.filter.id);

			return this.handleSuccess(res, event);
		} catch (error) {
			console.log(error, 'error');
			return this.handleError(res, error);
		}
    };

    async store(req, res) {
		try {
			const options = {
				event: {
					...req.data,
					user_id: req.userInfo.id,
				},
				file: req.body.file
			};

			const event = await EventService.store(options);

			return this.handleSuccess(res, event);
		} catch (error) {
			console.log(error, 'error')
			return this.handleError(res, error);
		}
    };

	async update(req, res) {
	    try {
			const options = {
				changes: req.data,
				filter:{
					id: req.filter.id
				}
			};

			await EventService.update(options);

			return this.handleSuccess(res, true);
		} catch (error) {
			return this.handleError(res, error);
		}
	}

    async delete(req, res) {
        try {
			await EventService.delete(req.filter.id);

			return this.handleSuccess(res, true);
		} catch (error) {
			return this.handleError(res, error);
		}
    }

	async showEvent(req, res) {
		try {

		} catch (error) {
			return this.handleError(res,error);
		}
	}

	async getAddress(req, res) {
		try {
			const response = await EventService.getCep(req.query.cep);

			return this.handleSuccess(res, response);


		} catch (error) {
			return this.handleError(res,error);
		}
	}
}

export default new EventController();
