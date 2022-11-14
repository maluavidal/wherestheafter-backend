import Sequelize from 'sequelize';
import databaseConfig from '../config/database.js';

import User from '../models/User.js';
import Client from '../models/Client.js';

const models = [User, Client];

class Database {
  constructor(){
    this.init();
  }

  init() {
	// console.log(databaseConfig);
    this.connection = new Sequelize(databaseConfig.development);

    models
      .map(model => {
		console.log(model.init);

		return model.init(this.connection)
	  })
      .map(model => {
		if (model.associate) {
			model.associate(this.connection.models)
		}
	  });
  }
}

export default new Database();

// conexao do banco de dados com os models
