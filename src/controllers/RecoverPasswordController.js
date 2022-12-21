import BaseController from './BaseController';
import RecoverPasswordService from '../services/RecoverPasswordService';

class RecoverPasswordController extends BaseController {
  constructor() {
    super();

	this.bindActions(['recovery', 'validateToken', 'changePassword']);
  }

  async recovery(req, res) {
    try {
		console.log(req);
      const user = await RecoverPasswordService.recoverPassword(req.data);

      return this.handleSuccess(res, user);
    } catch (err) {
      console.log(err);
      return this.handleError(res, err);
    }
  }

  async validateToken(req, res) {
    try {
      const validate = await RecoverPasswordService.validateToken(req.filter.token);

      return this.handleSuccess(res, validate);
    } catch (err) {
      return this.handleError(res, err);
    }
  }

  async changePassword(req, res) {
    try {
      const changes = { password: req.data.password };
      const { token } = req.params;
      const ip = req.socket.remoteAddress;

      await RecoverPasswordService.changePassword(changes, token, ip);

      return this.handleSuccess(res, RecoverPasswordService);
    } catch (err) {
      return this.handleError(res, err);
    }
  }
}

export default new RecoverPasswordController();
