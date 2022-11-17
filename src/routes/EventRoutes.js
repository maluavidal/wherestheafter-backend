import eventController from '../controllers/EventController';
import EventSchema from '../schema/EventSchema';
import BaseRoute from './BaseRoute';

class EventRoutes extends BaseRoute {
	setup(upload) {
		this.router.get('/', eventController.index);
		this.router.get('/:id', eventController.show);
		this.router.delete('/:id', eventController.delete);
		this.router.put('/:id', upload.single('file'), this.SchemaValidator.Validate(EventSchema.update), eventController.update);
		this.router.post('/', upload.single('file'), this.SchemaValidator.Validate(EventSchema.store), eventController.store);

		return this.router;
	}
}

export default new EventRoutes();
