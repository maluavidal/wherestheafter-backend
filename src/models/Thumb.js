import { Model, DataTypes } from 'sequelize';

export default class Thumb extends Model {
  static init(sequelize) {
    super.init({
      original_name: {
        type: DataTypes.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Empty field.',
          },
        },
      },
      file_name: {
        type: DataTypes.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Empty field.',
          },
        },
      },
      url: {
        type: DataTypes.STRING,
      }
    }, {
      sequelize,
	  paranoid: true,
      tableName: 'thumbs',
    });

    return this;
  }
}
