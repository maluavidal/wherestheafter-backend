import sessionController from '../controllers/SessionController';
import sessionSchema from '../schema/SessionSchema';
import BaseRoute from './BaseRoute';

class SessionRoutes extends BaseRoute {
	setup() {
		this.router.post('/', this.SchemaValidator.Validate(sessionSchema.store), sessionController.store);

		return this.router;
	}
}

export default new SessionRoutes();
