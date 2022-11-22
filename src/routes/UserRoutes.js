import BaseRoute from './BaseRoute';
import userSchema from '../schemas/UserSchema';
import userController from '../controllers/UserController';
import { tokenVerify, isAdmin } from '../middlewares/LoginRequired';

class UserRoutes extends BaseRoute {
	setup() {
		this.router.use(tokenVerify);
		this.router.get('/', isAdmin, userController.index);
		this.router.get('/:id', isAdmin, this.SchemaValidator.Validate(userSchema.show), userController.show);
		this.router.post('/', isAdmin, this.SchemaValidator.Validate(userSchema.store), userController.store);
		this.router.put('/:id', userController.update);
		this.router.delete('/:id', userController.delete);

		return this.router;
	}
}

export default new UserRoutes();
