import UserAccessLog from '../models/UserAccessLog';

class UserAccessLogService {
  async checkAccessVerification(filter) {
    try {
      const accessLogs = await UserAccessLog.findAll({
        where: filter,
        raw: true,
        attributes: ['status'],
        order: [['id', 'DESC']],
        limit: 3,
      });

	  console.log(accessLogs.length === 3 && accessLogs.every((log) => log.status === 'FAIL'));

      return accessLogs.length === 3 && accessLogs.every((log) => log.status === 'FAIL');
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new UserAccessLogService();
