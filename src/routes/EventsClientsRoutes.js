import EventsClientsController from '../controllers/EventsClientsController';
// import ClientSchema from '../schema/ClientSchema';
import BaseRoute from './BaseRoute';

class EventsClientsRoutes extends BaseRoute {
	setup() {
		this.router.get('/', EventsClientsController.index);
		this.router.get('/:id', EventsClientsController.show);
		this.router.put('/:id', EventsClientsController.update);
		this.router.delete('/:id', EventsClientsController.delete);
		this.router.post('/', EventsClientsController.store);

		return this.router;
	}
}

export default new EventsClientsRoutes();
