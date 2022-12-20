import BaseRoute from './BaseRoute';
import UserAccessLogController from '../controllers/UserAccessLogController';
import { tokenVerify } from '../middlewares/LoginRequired';

class UserAccessLogRoutes extends BaseRoute {
  setup() {
    this.router.post('/', tokenVerify, UserAccessLogController.checkAccessVerification);
    return this.router;
  }
}

export default new UserAccessLogRoutes();
