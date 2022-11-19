import ThumbController from '../controllers/ThumbController';
import BaseRoute from './BaseRoute';
import { tokenVerify } from '../middlewares/loginRequired';

class ThumbRoutes extends BaseRoute {
	setup(upload) {
		this.router.delete('/:id', tokenVerify, ThumbController.delete);

		return this.router;
	}
}

export default new ThumbRoutes();
