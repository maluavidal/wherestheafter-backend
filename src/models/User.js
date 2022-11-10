const { Model, DataTypes } = require('sequelize');

class User extends Model {
	static init(sequelize) {
	  super.init({
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		deleted_at: DataTypes.DATE,
		is_admin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false
		}
	  }, {
		sequelize,
		paranoid: true,
		tableName: 'users'
	  })
	  }
	}

  module.exports = User;
