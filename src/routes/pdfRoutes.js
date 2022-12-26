import PdfController from '../controllers/PdfController';
import PdfSchema from '../schemas/PdfSchema'
import BaseRoute from './BaseRoute';

class PdfRoutes extends BaseRoute {
	setup() {
		this.router.post('/:payment_id', this.SchemaValidator.Validate(PdfSchema.index), PdfController.index);

		return this.router;
	}
}

export default new PdfRoutes();
