import EventsClientsController from '../controllers/EventsClientsController';
import EventsClientSchema from '../schema/EventsClientSchema';
import BaseRoute from './BaseRoute';

class EventsClientsRoutes extends BaseRoute {
	setup() {
		this.router.get('/', EventsClientsController.index);
		this.router.get('/:id', this.SchemaValidator.Validate(EventsClientSchema.show),  EventsClientsController.show);
		this.router.get('/:event_id', this.SchemaValidator.Validate(EventsClientSchema.showEvent),  EventsClientsController.countConfirmedEvent);
		this.router.put('/:id', EventsClientsController.update);
		this.router.delete('/:id', this.SchemaValidator.Validate(EventsClientSchema.delete), EventsClientsController.delete);
		this.router.post('/', this.SchemaValidator.Validate(EventsClientSchema.store), EventsClientsController.store);

		return this.router;
	}
}

export default new EventsClientsRoutes();
