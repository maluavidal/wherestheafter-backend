import BaseRoute from './BaseRoute';
import userSchema from '../schema/UserSchema';
import userController from '../controllers/UserController';

class UserRoutes extends BaseRoute {
	setup() {
		this.router.get('/', userController.index);
		this.router.get('/:id', this.SchemaValidator.Validate(userSchema.show), userController.show);
		this.router.post('/', this.SchemaValidator.Validate(userSchema.store), userController.store);
		this.router.put('/:id', userController.update);
		this.router.delete('/:id', userController.delete);

		return this.router;
	}
}

export default new UserRoutes();
