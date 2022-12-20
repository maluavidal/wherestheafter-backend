import bcryptjs from 'bcryptjs';
const { Model, DataTypes } = require('sequelize');

export default class User extends Model {
	static init(sequelize) {
	  super.init({
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.VIRTUAL,
		password_hash: DataTypes.STRING,
		deleted_at: DataTypes.DATE,
		is_admin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false
		},
		is_blocked: DataTypes.BOOLEAN,
		password_reset_token: DataTypes.DATE,
		password_reset_expires: DataTypes.DATE
	  }, {
		sequelize,
		paranoid: true,
		tableName: 'users'
	  });

	  this.addHook('beforeSave', async (user) => {
		if (user.password) {
		  user.password_hash = await bcryptjs.hash(user.password, 8);
		}
	  });

	  return this;
	}

	checkPassword(password) {
		return bcryptjs.compare(password, this.password_hash);
	}

}
