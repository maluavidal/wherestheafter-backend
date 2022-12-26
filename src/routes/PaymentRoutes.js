import paymentController from '../controllers/PaymentController';
import PaymentSchema from '../schemas/PaymentSchema';
import BaseRoute from './BaseRoute';

class PaymentRoutes extends BaseRoute {
	setup() {
		// this.router.get('/', paymentController.index);
		this.router.get('/:id', this.SchemaValidator.Validate(PaymentSchema.show), paymentController.show);
		// this.router.delete('/:id', this.SchemaValidator.Validate(PaymentSchema.delete), paymentController.delete);
		this.router.post('/:client_id/:event_id', this.SchemaValidator.Validate(PaymentSchema.store), paymentController.store);

		return this.router;
	}
}

export default new PaymentRoutes();
