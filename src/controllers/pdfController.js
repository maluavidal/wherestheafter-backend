import BaseController from './BaseController';
import PdfService from '../services/PdfService';

class PdfController extends BaseController {
	constructor() {
		super();

		this.bindActions(['index']);
	}

	async index(req, res) {
		try {
			const response = await PdfService.exportPDF(req.filter.id);

			res.download(response);
		} catch (error) {
			return this.handleError(res, error);
		}
	}
}

export default new PdfController();
