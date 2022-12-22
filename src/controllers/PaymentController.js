import BaseController from './BaseController';
import PaymentService from '../services/PaymentService';

class PaymentController extends BaseController {
	constructor() {
		super();

		this.bindActions(['index', 'show', 'store', 'delete']);
	};

    async index(req, res) {
        try {
			const payments = await PaymentService.list();

			return this.handleSuccess(res, payments);
		} catch (error) {
			return this.handleError(res, error);
		}
    };

    async show(req, res) {
        try {
			const payment = await PaymentService.show(req.filter.id);

			return this.handleSuccess(res, payment);
		} catch (error) {
			return this.handleError(res, error);
		}
    };

    async store(req, res) {
		try {
			const payment = await PaymentService.store({
				...req.data,
				client_id: req.filter.client_id,
				event_id: req.filter.event_id
			});

			return this.handleSuccess(res, payment);
		} catch (error) {
			console.log(JSON.stringify(error, null ,4));
			return this.handleError(res, error);
		}
    };

    async delete(req, res) {
        try {
			await PaymentService.delete(req.filter.id);

			return this.handleSuccess(res, true);
		} catch (error) {
			return this.handleError(res, error);
		}
    }
}

export default new PaymentController();
