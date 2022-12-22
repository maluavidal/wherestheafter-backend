import { Payment } from "../models";
import { EventsClient } from "../models";

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
		await Payment.create(data);
		console.log(data);

		await EventsClient.create({
			client_id: data.client_id,
			event_id: data.event_id,
			payment_method: data.payment_method
		})
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
