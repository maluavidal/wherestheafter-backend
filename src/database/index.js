import Sequelize from 'sequelize';
import databaseConfig from '../config/database.js';

import User from '../models/User.js';
import Client from '../models/Client.js';
import Event from '../models/Event.js';

const models = [User, Client, Event];

class Database {
  constructor(){
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig.development);

    models
      .map(model => {
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
