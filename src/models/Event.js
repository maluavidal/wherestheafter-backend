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
	  this.belongsTo(models.EventManager, { foreignKey: 'event_manager_id', as: 'eventManager' });
	}
  }

  module.exports = Event;
