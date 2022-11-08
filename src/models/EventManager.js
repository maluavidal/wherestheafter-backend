const { Model, DataTypes } = require('sequelize');

class EventManager extends Model {
	static init(sequelize) {
	  super.init({
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		deleted_at: DataTypes.DATE,
	  }, {
		sequelize,
		paranoid: true,
	  })
	  }
	}

  module.exports = EventManager;
