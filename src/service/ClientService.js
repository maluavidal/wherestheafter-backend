import { Client } from "../models";

class ClientService {
	async store(data) {
		try {
			return Client.create(data);

		} catch (error) {
			throw new Error(error);
		}
	}
}

export default new ClientService();
