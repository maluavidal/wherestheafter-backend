import ThumbController from '../controllers/ThumbController';
import BaseRoute from './BaseRoute';
import ThumbSchema from '../schemas/ThumbSchema'
import { tokenVerify } from '../middlewares/LoginRequired';

class ThumbRoutes extends BaseRoute {
	setup(upload) {
		this.router.delete('/:id', tokenVerify, this.SchemaValidator.Validate(ThumbSchema.delete), ThumbController.delete);

		return this.router;
	}
}

export default new ThumbRoutes();
