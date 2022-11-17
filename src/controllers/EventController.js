import BaseController from './BaseController';
import EventService from '../service/EventService';

class EventController extends BaseController {
	constructor() {
		super();

		this.bindActions(['index', 'show', 'store', 'update', 'delete']);
	};

    async index(req, res) {
        try {
			const events = await EventService.list();

			return this.handleSuccess(res, events);
		} catch (error) {
			return this.handleError(res, error);
		}
    };

    async show(req, res) {
        try {
			const event = await EventService.show(req.params.id);

			return this.handleSuccess(res, event);
		} catch (error) {
			return this.handleError(res, error);
		}
    };

    async store(req, res) {
		try {
			console.log(req.data, 'data no controller')
			const event = await EventService.store(req.data);

			return this.handleSuccess(res, event);
		} catch (error) {
			return this.handleError(res, error);
		}
    };

	async update(req, res) {
	    try {
			const options = {
				changes: req.body,
				filter:{
					id: req.params.id
				}
			};

			const event = await EventService.update(options);

			return this.handleSuccess(res, event);
		} catch (error) {
			return this.handleError(res, error);
		}
	}

    async delete(req, res) {
        try {
			await EventService.delete(req.params.id);

			return this.handleSuccess(res, true);
		} catch (error) {
			return this.handleError(res, error);
		}
    }
}

export default new EventController();
