import userController from '../controllers/UserController';
import userSchema from '../schema/UserSchema';
import BaseRoute from './BaseRoute';

// import loginRequired from '../middlewares/loginRequired';

class UserRoutes extends BaseRoute {
	setup() {
		this.router.post('/', this.SchemaValidator.Validate(userSchema.store), userController.store);

		return this.router;
	}
}

export default new UserRoutes();
