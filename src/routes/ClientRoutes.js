import clientController from '../controllers/ClientController';
import ClientSchema from '../schema/ClientSchema';
import BaseRoute from './BaseRoute';

class ClientRoutes extends BaseRoute {
	setup() {
		this.router.get('/', clientController.index);
		this.router.get('/:id', clientController.show);
		this.router.put('/:id', clientController.update);
		this.router.delete('/:id', clientController.delete);
		this.router.post('/', this.SchemaValidator.Validate(ClientSchema.store), clientController.store);

		return this.router;
	}
}

export default new ClientRoutes();
