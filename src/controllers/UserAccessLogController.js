import BaseController from './BaseController';
import UserAccessLogService from '../services/UserAccessLogService';

class UserAccessLogController extends BaseController {
  constructor() {
    super();

    this.bindActions(['checkAccessVerification']);
  }

  async checkAccessVerification(req, res) {
    try {
      const filter = {
        user_id: req.userId,
      };

      const accessLogs = await UserAccessLogService.checkAccessVerification(filter);

      return this.handleSuccess(res, accessLogs);
    } catch (err) {
      return this.handleError(res, err);
    }
  }
}

export default new UserAccessLogController();
