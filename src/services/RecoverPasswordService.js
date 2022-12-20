import crypto from 'crypto';
import moment from 'moment';
import { Op } from 'sequelize';
import bcryptjs from 'bcryptjs';
import sendEmailService from './sendEmailService';
import User from '../models/User'
import UserAccessLog from '../models/UserAccessLog';
const UserAccessLogService= require('./UserAccessLogService');

class RecoverPasswordService {
	async recoverPassword(data) {
		const user = await User.findOne({
			where: {
				email: data.email,
			},
			attributes: ['id', 'name', 'email'],
			raw: true,
		});

		if (!user) {
			throw new Error('User does not exist.');
		}

		const token = crypto.randomBytes(20).toString('hex');

		await User.update({
			password_reset_token: token,
			password_reset_expires: moment().add(1, 'hour').toISOString(),
		}, {
			where: {
				id: user.id,
			},
		});

		await sendEmailService.sendEmail({
			context: {
				user,
				token,
			},
			subject: 'Recuperação de senha',
			template: 'recover-password',
		}, user.email);

		return true;
	}

	async validateToken(token) {
		const hasToken = await User.findOne({
			where: {
				password_reset_token: token,
				password_reset_expires: {
					[Op.gt]: moment(),
				},
			},
			attributes: ['name', 'email', 'id'],
			raw: true,
		});

		if (!hasToken) {
			throw new Error('There is no token.');
		}

		return hasToken;
	}

	async changePassword(data, token, ip) {
		const user = await this.validateToken(token);

		const changes = {
			password_reset_token: null,
			password_reset_expires: null,
			is_blocked: false,
		};

		changes.password_hash = await bcryptjs.hash(data.password, 8);

		await User.update(changes, {
			where: {
				password_reset_token: token,
			},
		});

		await UserAccessLog.destroy({
			where: {
				user_id: user.id
			}
		})

		const options = {
			context: {
				user,
				date: moment().format('DD/MM/YYYY [às] HH:mm'),
				ip,
			},
			subject: 'Senha alterada',
			template: 'change-password',
		};

		await sendEmailService.sendEmail(options, user.email);

		return true;
	}
}

export default new RecoverPasswordService();
