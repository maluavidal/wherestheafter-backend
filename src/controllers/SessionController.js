import BaseController from './BaseController';
import SessionService from '../services/SessionService';

class SessionController extends BaseController {
	constructor() {
		super();

		this.store = this.store.bind(this);
	}

	async store(req, res) {
		try {
			const token = await SessionService.store(req.data);

			return this.handleSuccess(res, token);
		} catch (error) {
			return this.handleError(res, error);
		}
	}

}

export default new SessionController();
