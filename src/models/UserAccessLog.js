import { Model, DataTypes } from 'sequelize';

export default class UserAccessLog extends Model {
  static init(sequelize) {
    super.init(
      {
        status: {
          type: DataTypes.STRING,
          defaultValue: '',
        },
      },
      {
        sequelize,
      },
    );

	return this
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}
