import jwt from 'jsonwebtoken';
import User from '../models/User';

class SessionController {
	async store(data) {
		try {
			const { email, password } = data;

			// verificando existencia do email
			const user = await User.findOne({ where: { email: email } });

			if (!user) {
				// return res.status(401).json({ error: 'User does not exist.' });
				throw new Error('User does not exist.')
			};

			// verificando se a senha nao bate
			if (!(await user.checkPassword(password))) {
				// return res.status(401).json({ error: 'Incorrect password.' });
				throw new Error('Incorrect password.')

			}

			const { id } = user;

			const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
				expiresIn: process.env.TOKEN_EXPIRATION,
			});

			return token;

		} catch (error) {
			return error;
		}

	}
}

export default new SessionController();
