import BaseController from './BaseController';
import EventsClientService from "../services/EventsClientService";

class EventsClientController extends BaseController {
	constructor() {
		super();

		this.bindActions(['index', 'show', 'store', 'update', 'delete', 'countConfirmedEvent']);
	}

	async index(req, res) {
		try {
			const eventsclients = await EventsClientService.list();

			return this.handleSuccess(res, eventsclients);
		} catch (error) {
			return this.handleError(res, error);
		}
	};
	async countConfirmedEvent(req, res) {
		try {
			const eventsclients = await EventsClientService.countConfirmedEvent(req.filter.event_id);

			return this.handleSuccess(res, eventsclients);
		} catch (error) {
			return this.handleError(res, error);
		}
	};

	async show(req, res) {
		try {
			const eventsclient = await EventsClientService.show(req.filter.id);

			return this.handleSuccess(res, eventsclient);
		} catch (error) {
			return this.handleError(res, error);
		}
	};

	async store(req, res) {
		try {
			const eventsclient = await EventsClientService.store(req.data);

			return this.handleSuccess(res, eventsclient);
		} catch (error) {
			return this.handleError(res, error);
		}
	}

	async update(req, res) {
		try {
			const options = {
				changes: req.data,
				filter:{
					id: req.filter.id
				}
			};

			const eventsclient = await EventsClientService.update(options);

			return this.handleSuccess(res, eventsclient);
		} catch (error) {
			return this.handleError(res, error);

		}
	}

	async delete(req, res) {
		try {
			const eventsclient = await EventsClientService.delete(req.filter.id);

			return this.handleSuccess(res, eventsclient);
		} catch (error) {
			return this.handleError(res, error);
		}
	}
}

export default new EventsClientController();
