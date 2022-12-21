import { Payment } from "../models";

class PaymentService {
	async list() {
		return Payment.findAll({
			order: [['id', 'ASC']]
		});
	};

	async show(id) {
		const payment = {
			where: {
				id
			}
		};

		return Payment.findOne(payment);
	};

	async store(data) {
		return Payment.create(data);
	};

	async delete(id) {
		const payment = {
			where: {
				id
			}
		}
		await Payment.destroy(payment);

		return true;
	};
}


export default new PaymentService();
