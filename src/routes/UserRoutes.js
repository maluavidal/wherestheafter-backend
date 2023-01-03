import BaseRoute from './BaseRoute';
import userSchema from '../schemas/UserSchema';
import userController from '../controllers/UserController';
import { tokenVerify, isAdmin, isProducer } from '../middlewares/LoginRequired';

class UserRoutes extends BaseRoute {
	setup() {
		this.router.post('/', this.SchemaValidator.Validate(userSchema.store), userController.store);
		this.router.use(tokenVerify);
		this.router.get('/', isAdmin, userController.index);
		this.router.get('/user-profile', this.SchemaValidator.Validate(userSchema.show), userController.show);
		this.router.get('/profile', this.SchemaValidator.Validate(userSchema.profile), userController.profile);
		this.router.put('/', this.SchemaValidator.Validate(userSchema.update), userController.update);
		this.router.delete('/:id', isProducer, this.SchemaValidator.Validate(userSchema.delete), userController.delete);
		this.router.get('/:id', isAdmin, this.SchemaValidator.Validate(userSchema.show), userController.show);

		return this.router;
	}
}

export default new UserRoutes();
