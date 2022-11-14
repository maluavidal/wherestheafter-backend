import clientController from '../controllers/ClientController';
import ClientSchema from '../schema/ClientSchema';
import BaseRoute from './BaseRoute';

class ClientRoutes extends BaseRoute {
	setup() {
		this.router.post('/', this.SchemaValidator.Validate(ClientSchema.store), clientController.store);

		return this.router;
	}
}


// router.get('/', clientController.index);
// // router.get('/:id', clientController.show);
// router.post('/', SchemaValidator.Validate(ClientSchema.store), clientController.store);
// // router.put('/:id', clientController.update);
// // router.delete('/:id', clientController.delete);

export default new ClientRoutes();
