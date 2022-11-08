const { Model, DataTypes } = require('sequelize');

class EventsClients extends Model {
	static init(sequelize) {
	  super.init({
		payment_method: DataTypes.INTEGER,
		deleted_at: DataTypes.DATE,
	  }, {
		sequelize,
		paranoid: true,
	  })
	}

	static associate(models) {
	  this.belongsTo(models.Event, { foreignKey: 'event_id', as: 'eventManager' });
	  this.belongsTo(models.Client, { foreignKey: 'client_id', as})
	}
  }

  module.exports = EventsClients;
