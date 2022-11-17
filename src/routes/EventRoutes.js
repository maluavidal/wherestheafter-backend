import eventController from '../controllers/EventController';
import EventSchema from '../schema/EventSchema';
import BaseRoute from './BaseRoute';

class EventRoutes extends BaseRoute {
	setup() {
		this.router.get('/', eventController.index);
		this.router.get('/:id', eventController.show);
		this.router.put('/:id', this.SchemaValidator.Validate(EventSchema.store), eventController.update);
		this.router.delete('/:id', eventController.delete);
		this.router.post('/', this.SchemaValidator.Validate(EventSchema.store), eventController.store);

		return this.router;
	}
}

export default new EventRoutes();
