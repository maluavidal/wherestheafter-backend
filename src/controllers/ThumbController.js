import BaseController from './BaseController';
import ThumbService from "../services/ThumbService";

class ThumbController extends BaseController {

	constructor() {
		super();

		this.bindActions(['showAll', 'delete']);
	}

	async showAll(req, res) {
		try {
			const thumb = await ThumbService.showAll();

			return this.handleSuccess(res, thumb);
		} catch (error) {
			return this.handleError(res, error);

		}
	}

	async delete(req, res) {
		try {
			const thumb = await ThumbService.delete(req.filter);

			return this.handleSuccess(res, thumb);
		} catch (error) {
			return this.handleError(res, error);

		}
	}
}

export default new ThumbController();
