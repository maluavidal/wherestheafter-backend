import eventController from '../controllers/EventController';
import EventSchema from '../schemas/EventSchema';
import BaseRoute from './BaseRoute';
import { tokenVerify } from '../middlewares/LoginRequired';

class EventRoutes extends BaseRoute {
	setup(upload) {
		this.router.get('/', this.SchemaValidator.Validate(EventSchema.list), eventController.index);
		this.router.get('/:id', this.SchemaValidator.Validate(EventSchema.show), eventController.show);
		this.router.delete('/:id', tokenVerify, this.SchemaValidator.Validate(EventSchema.delete), eventController.delete);
		this.router.put('/:id', tokenVerify, upload.single('file'), this.SchemaValidator.Validate(EventSchema.update), eventController.update);
		this.router.post('/', tokenVerify, upload.single('file'), this.SchemaValidator.Validate(EventSchema.store), eventController.store);

		return this.router;
	}
}

export default new EventRoutes();
