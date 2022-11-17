import ThumbController from '../controllers/ThumbController';
import ThumbSchema from '../schema/ThumbSchema';
import BaseRoute from './BaseRoute';

class PhotoRoutes extends BaseRoute {
	setup() {
		this.router.get('/', ThumbController.index);
		this.router.get('/:id', ThumbController.show);
		this.router.put('/:id', this.SchemaValidator.Validate(ThumbSchema.update), ThumbController.update);
		this.router.delete('/:id', ThumbController.delete);
		this.router.post('/', this.SchemaValidator.Validate(ThumbSchema.store), ThumbController.store);

		return this.router;
	}
}

export default new PhotoRoutes();
