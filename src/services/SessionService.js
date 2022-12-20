import jwt from 'jsonwebtoken';
import { UserAccessLog } from '../models';
import User from '../models/User';
import UserAccessLogService from './UserAccessLogService';

class SessionController {
	async store(data) {
			const { email, password } = data;

			const user = await User.findOne({ where: { email } });

			if (user.is_blocked === true){
				throw new Error('User is currently blocked.')
			}

			if (!user) {
				throw new Error('User does not exist.')
			};

			const { id } = user;

			if (!(await user.checkPassword(password))) {
				const allowUserBlock = await UserAccessLogService.checkAccessVerification({
					user_id: id
				})

				if (!allowUserBlock) {
					await UserAccessLog.create({
						user_id: id,
						status: 'FAIL',
					});

					throw new Error('Invalid password')
				}

				await User.update({
					is_blocked: true,
				}, {
					where: {
						id,
					}
				})

				throw new Error('User is blocked')
			}

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
