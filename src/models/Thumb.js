import { Model, DataTypes, Sequelize } from 'sequelize';
import appConfig from '../config/appConfig';

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
        type: DataTypes.VIRTUAL,
        get() {
          return `${appConfig.url}/images/${this.getDataValue('filename')}`;
        },
      }
    }, {
      sequelize,
	  paranoid: true,
      tableName: 'thumbs',
    });

    return this;
  }
}
