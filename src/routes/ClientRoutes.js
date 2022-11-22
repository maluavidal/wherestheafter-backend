import clientController from '../controllers/ClientController';
import ClientSchema from '../schemas/ClientSchema';
import BaseRoute from './BaseRoute';

class ClientRoutes extends BaseRoute {
	setup() {
		this.router.get('/', clientController.index);
		this.router.get('/:id', this.SchemaValidator.Validate(ClientSchema.show), clientController.show);
		this.router.put('/:id', this.SchemaValidator.Validate(ClientSchema.update), clientController.update);
		this.router.delete('/:id', this.SchemaValidator.Validate(ClientSchema.delete), clientController.delete);
		this.router.post('/', this.SchemaValidator.Validate(ClientSchema.store), clientController.store);

		return this.router;
	}
}

export default new ClientRoutes();
