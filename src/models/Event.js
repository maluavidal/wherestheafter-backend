const { Model, DataTypes } = require('sequelize');

export default class Event extends Model {
	static init(sequelize) {
	  super.init({
		name: DataTypes.STRING,
		about: DataTypes.TEXT,
		address: DataTypes.STRING,
		address_city: DataTypes.STRING,
		starts_at: DataTypes.DATE,
		ends_at: DataTypes.DATE,
		min_age: DataTypes.INTEGER,
		address_cep: DataTypes.STRING,
		thumb_url: DataTypes.STRING,
		price: DataTypes.DOUBLE
	  }, {
		sequelize,
		paranoid: true
	  })

	  return this;
	}

	static associate(models) {
	  this.belongsTo(models.User, { foreignKey: 'user_id' });
	}
  }
