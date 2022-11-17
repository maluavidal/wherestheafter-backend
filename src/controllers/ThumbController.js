import BaseController from './BaseController';
import ThumbService from "../service/ThumbService";

// const upload = multer(multerConfig).single('file');

class ThumbController extends BaseController {

	constructor() {
		super();

		this.bindActions(['index', 'show', 'store', 'update', 'delete']);
	}

	async index(req, res) {
		try {
			const thumbs = await ThumbService.list();

			return this.handleSuccess(res, thumbs);
		} catch (error) {
			return this.handleError(res, error);
		}
	};

	async show(req, res) {
		try {
			const thumb = await ThumbService.show(req.params);

			return this.handleSuccess(res, thumb);
		} catch (error) {
			return this.handleError(res, error);
		}
	};

	async store(req, res) {
		try {
			const thumb = await ThumbService.store(req.data);

			return this.handleSuccess(res, thumb);
		} catch (error) {
			return this.handleError(res, error);
		}
	}

	async update(req, res) {
		try {
			const thumb = await ThumbService.update(req.params);

			return this.handleSuccess(res, thumb);
		} catch (error) {
			return this.handleError(res, error);

		}
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
