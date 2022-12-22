const { Model, DataTypes } = require('sequelize');

class Payment extends Model {
	static init(sequelize) {
	  super.init({
		card_number: DataTypes.STRING,
		expiration_date: DataTypes.STRING,
		security_code: DataTypes.STRING,
		cardholder_name: DataTypes.STRING,
		cardholder_birthdate: DataTypes.DATE,
		cpf: DataTypes.STRING,
		client_id: DataTypes.NUMBER,
		event_id: DataTypes.NUMBER
	  }, {
		sequelize,
		paranoid: true,
		tableName: 'payment_data'
	  })

	  return this;
	}

	static associate(models) {
		this.belongsTo(models.Client, { foreign: 'client_id'}),
		this.belongsTo(models.Event, { foreign: 'event_id'})
	}
}

module.exports = Payment;
