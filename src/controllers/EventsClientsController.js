import BaseController from './BaseController';
import EventsClientsService from "../service/EventsClientsService";

class EventsClientsController extends BaseController {
	constructor() {
		super();

		this.bindActions(['index', 'show', 'store', 'update', 'delete']);
	}

	async index(req, res) {
		try {
			const eventsclients = await EventsClientsService.list();

			return this.handleSuccess(res, eventsclients);
		} catch (error) {
			return this.handleError(res, error);
		}
	};

	async show(req, res) {
		try {
			const eventsclient = await EventsClientsService.show(req.params);

			return this.handleSuccess(res, eventsclient);
		} catch (error) {
			return this.handleError(res, error);
		}
	};

	async store(req, res) {
		try {
			const eventsclient = await EventsClientsService.store(req.data);

			return this.handleSuccess(res, eventsclient);
		} catch (error) {
			return this.handleError(res, error);
		}
	}

	async update(req, res) {
		try {
			const eventsclient = await EventsClientsService.update(req.params);

			return this.handleSuccess(res, eventsclient);
		} catch (error) {
			return this.handleError(res, error);

		}
	}

	async delete(req, res) {
		try {
			const eventsclient = await EventsClientsService.delete(req.params);

			return this.handleSuccess(res, eventsclient);
		} catch (error) {
			return this.handleError(res, error);

		}
	}
}

export default new EventsClientsController();
