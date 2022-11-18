import eventController from '../controllers/EventController';
import EventSchema from '../schema/EventSchema';
import BaseRoute from './BaseRoute';
import { tokenVerify } from '../middlewares/loginRequired';

class EventRoutes extends BaseRoute {
	setup(upload) {
		this.router.get('/', eventController.index);
		this.router.get('/:id', eventController.show);
		this.router.delete('/:id', tokenVerify, eventController.delete);
		this.router.put('/:id', tokenVerify, upload.single('file'), this.SchemaValidator.Validate(EventSchema.update), eventController.update);
		this.router.post('/', tokenVerify, upload.single('file'), this.SchemaValidator.Validate(EventSchema.store), eventController.store);

		return this.router;
	}
}

export default new EventRoutes();
