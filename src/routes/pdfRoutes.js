import PdfController from '../controllers/PdfController';
import BaseRoute from './BaseRoute';

class PdfRoutes extends BaseRoute {
	setup() {
		this.router.get('/:id', PdfController.index);

		return this.router;
	}
}

export default new PdfRoutes();
