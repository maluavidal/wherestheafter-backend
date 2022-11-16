const { Model, DataTypes } = require('sequelize');

export default class Client extends Model {
	static init(sequelize) {
	  super.init({
		name: DataTypes.STRING,
		cpf: DataTypes.STRING,
		email: DataTypes.STRING,
		born_at: DataTypes.DATE,
	  }, {
		sequelize,
		paranoid: true
	  })

	  return this;
	}
}

module.exports = Client;
