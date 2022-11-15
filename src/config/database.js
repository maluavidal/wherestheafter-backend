module.exports = {
	development: {
	  username: 'qyphmpcumssfsx',
	  password: '5f2d6a645b814a92d92fe54484c9c7309c37ba687aea5760c4bdb95e5f67b801',
	  database: 'dfkausbnra9kvn',
	  host: 'ec2-3-227-68-43.compute-1.amazonaws.com',
	  dialect: 'postgres',
	  dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false
		}
	  },
	  define: {
		timestamps: true,
		underscored: true,
		underscoredAll: true,
		createdAt: 'created_at',
    	updatedAt: 'updated_at',
	  }
	},
	test: {
	  username: 'root',
	  password: null,
	  database: 'database_test',
	  host: '127.0.0.1',
	  dialect: 'mysql',
	},
	production: {
	  username: 'root',
	  password: null,
	  database: 'database_production',
	  host: '127.0.0.1',
	  dialect: 'mysql',
	},
};
