const { Model, DataTypes } = require('sequelize');

class EventsClients extends Model {
	static init(sequelize) {
	  super.init({
		payment_method: DataTypes.STRING,
		deleted_at: DataTypes.DATE,
	  }, {
		sequelize,
		paranoid: true,
	  })

	  return this;
	}

	static associate(models) {
	  this.belongsTo(models.Event, { foreignKey: 'event_id' });
	  this.belongsTo(models.Client, { foreignKey: 'client_id' })
	}
  }

  module.exports = EventsClients;
