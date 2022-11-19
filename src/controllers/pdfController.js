import BaseController from './BaseController';
import pdfService from '../service/pdfService';

class pdfController extends BaseController {
	constructor() {
		super();

		this.bindActions(['index']);
	}

	async index(req, res) {
		try {
			const response = await pdfService.exportPDF(req.params.id);

			res.type('pdf');
			res.download(response);

			return this.handleSuccess(res, response);
		} catch (error) {
			return this.handleError(res, error);
		}
	}
}

export default new pdfController();
