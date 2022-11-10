const { Model, DataTypes } = require('sequelize');

class Event extends Model {
	static init(sequelize) {
	  super.init({
		name: DataTypes.STRING,
		about: DataTypes.TEXT,
		starts_at: DataTypes.DATE,
		ends_at: DataTypes.DATE,
	  }, {
		sequelize,
		paranoid: true,
	  })
	}

	static associate(models) {
	  this.belongsTo(models.User, { foreignKey: 'user_id' });
	}
  }

  module.exports = Event;
