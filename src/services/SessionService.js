import jwt from 'jsonwebtoken';
import User from '../models/User';

class SessionController {
	async store(data) {
			const { email, password } = data;

			const user = await User.findOne({ where: { email: email } });

			if (!user) {
				throw new Error('User does not exist.')
			};

			if (!(await user.checkPassword(password))) {
				throw new Error('Incorrect password.')
			}

			const { id } = user;

			const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
				expiresIn: process.env.TOKEN_EXPIRATION,
			});

			return {
				id,
				token
			};
	}
}

export default new SessionController();
