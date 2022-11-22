import BaseController from './BaseController';
import ThumbService from "../services/ThumbService";

class ThumbController extends BaseController {

	constructor() {
		super();

		this.bindActions(['delete']);
	}

	async delete(req, res) {
		try {
			const thumb = await ThumbService.delete(req.params);

			return this.handleSuccess(res, thumb);
		} catch (error) {
			return this.handleError(res, error);

		}
	}
}

export default new ThumbController();
