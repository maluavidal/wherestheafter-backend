module.exports = {
	async up(queryInterface, Sequelize) {
	  await queryInterface.addColumn(
		'users',
		'is_blocked',
		{
		  type: Sequelize.BOOLEAN,
		  defaultValue: false,
		  allowNull: false,
		},
	  );
	},
	async down(queryInterface) {
	  await queryInterface.removeColumn(
		'users',
		'is_blocked',
	  );
	},
  };
