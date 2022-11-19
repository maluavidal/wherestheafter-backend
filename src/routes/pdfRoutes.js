import pdfController from '../controllers/pdfController';
import BaseRoute from './BaseRoute';

class pdfRoutes extends BaseRoute {
	setup() {
		this.router.get('/:id', pdfController.index);

		return this.router;
	}
}

export default new pdfRoutes();
