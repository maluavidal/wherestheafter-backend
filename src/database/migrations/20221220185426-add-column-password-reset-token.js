module.exports = {
	async up(queryInterface, Sequelize) {
	  await queryInterface.addColumn(
		'users',
		'password_reset_token',
		{
		  type: Sequelize.STRING,
		  defaultValue: null,
		  allowNull: true,
		},
	  );

	  await queryInterface.addColumn(
		'users',
		'password_reset_expires',
		{
		  type: Sequelize.DATE,
		  defaultValue: null,
		  allowNull: true,
		},
	  );
	},
	async down(queryInterface) {
	  await queryInterface.removeColumn(
		'users',
		'password_reset_token',
	  );
	  await queryInterface.removeColumn(
		'users',
		'password_reset_expires',
	  );
	},
  };
