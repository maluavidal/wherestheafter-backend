import BaseController from './BaseController';
import ClientService from '../services/ClientService';

class ClientController extends BaseController {
	constructor() {
		super();

		this.bindActions(['index', 'show', 'store', 'update', 'delete']);
	};

    async index(req, res) {
        try {
			const clients = await ClientService.list();

			return this.handleSuccess(res, clients);
		} catch (error) {
			return this.handleError(res, error);
		}
    };

    async show(req, res) {
        try {
			const client = await ClientService.show(req.filter.id);

			return this.handleSuccess(res, client);
		} catch (error) {
			return this.handleError(res, error);
		}
    };

    async store(req, res) {
		try {
			const client = await ClientService.store(req.data);

			return this.handleSuccess(res, client);
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

			const client = await ClientService.update(options);

			return this.handleSuccess(res, client);
		} catch (error) {
			return this.handleError(res, error);
		}
	}

    async delete(req, res) {
        try {
			await ClientService.delete(req.params.id);

			return this.handleSuccess(res, true);
		} catch (error) {
			return this.handleError(res, error);
		}
    }
}

export default new ClientController();
