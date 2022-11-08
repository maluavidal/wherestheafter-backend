const { Model, DataTypes } = require('sequelize');

class Client extends Model {
	static init(sequelize) {
	  super.init({
		name: DataTypes.STRING,
		cpf: DataTypes.STRING,
		email: DataTypes.STRING,
		born_at: DataTypes.STRING,
		deleted_at: DataTypes.DATE,
	  }, {
		sequelize,
		paranoid: true,
	  })
	}
  }

  module.exports = Client;
