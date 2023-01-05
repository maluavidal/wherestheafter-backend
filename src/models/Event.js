const { Model, DataTypes } = require('sequelize');

export default class Event extends Model {
	static init(sequelize) {
		super.init({
			name: DataTypes.STRING,
			about: DataTypes.TEXT,
			state: DataTypes.STRING,
			city: DataTypes.STRING,
			street: DataTypes.STRING,
			starts_at: DataTypes.DATE,
			ends_at: DataTypes.DATE,
			min_age: DataTypes.INTEGER,
			address_cep: DataTypes.STRING,
			price: DataTypes.DOUBLE,
			number: DataTypes.STRING,
			venue: DataTypes.STRING,
			tickets_amount: DataTypes.INTEGER,
			status: {
				type: DataTypes.ENUM('ongoing', 'over', 'disabled')
			}
		}, {
			sequelize,
			paranoid: true,
			deletedAt: 'deleted_at'
		})

		return this;
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'user_id' });
		this.belongsTo(models.Thumb, { foreignKey: 'thumb_id' });
	}
}
