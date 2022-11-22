import EventsClientController from '../controllers/EventsClientController';
import EventsClientSchema from '../schemas/EventsClientSchema';
import BaseRoute from './BaseRoute';

class EventsClientRoutes extends BaseRoute {
	setup() {
		this.router.get('/', EventsClientController.index);
		this.router.get('/:id', this.SchemaValidator.Validate(EventsClientSchema.show),  EventsClientController.show);
		this.router.get('/clients/:event_id', this.SchemaValidator.Validate(EventsClientSchema.showEvent),  EventsClientController.countConfirmedEvent);
		this.router.put('/:id', this.SchemaValidator.Validate(EventsClientSchema.update), EventsClientController.update);
		this.router.delete('/:id', this.SchemaValidator.Validate(EventsClientSchema.delete), EventsClientController.delete);
		this.router.post('/', this.SchemaValidator.Validate(EventsClientSchema.store), EventsClientController.store);

		return this.router;
	}
}

export default new EventsClientRoutes();
