import BaseRoute from './BaseRoute';
import RecoverPasswordController from '../controllers/RecoverPasswordController';
import RecoverPasswordSchema from '../schemas/RecoverPasswordSchema';

class RecoverPasswordRoutes extends BaseRoute {
	setup() {
		this.router.post('/recovery', this.SchemaValidator.Validate(RecoverPasswordSchema.recovery), RecoverPasswordController.recovery);
		this.router.get('/validate-token-password/:token', this.SchemaValidator.Validate(RecoverPasswordSchema.token), RecoverPasswordController.validateToken);
		this.router.put('/change-password/:token', this.SchemaValidator.Validate(RecoverPasswordSchema.change), RecoverPasswordController.changePassword);

		return this.router;
	}
}

export default new RecoverPasswordRoutes();
