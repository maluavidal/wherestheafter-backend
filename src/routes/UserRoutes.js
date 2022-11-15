import BaseRoute from './BaseRoute';
import userSchema from '../schema/UserSchema';
import userController from '../controllers/UserController';

class UserRoutes extends BaseRoute {
	setup() {
		this.router.get('/', userController.index);
		this.router.get('/', userController.show);
		this.router.post('/', this.SchemaValidator.Validate(userSchema.store), userController.store);
		this.router.put('/', userController.update);
		this.router.delete('/', userController.delete);

		return this.router;
	}
}

export default new UserRoutes();
