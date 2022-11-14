import { User } from "../models";

class UserService {
	async store(data) {
		try {
			return User.create(data);

		} catch (error) {
			console.log(error);
			throw new Error(error);
		}
	}
}

export default new UserService();
