module.exports = {
	development: {
	  username: 'marialuiza',
	  password: null,
	  database: 'wherestheafter',
	  host: 'localhost',
	  dialect: 'postgres',
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
