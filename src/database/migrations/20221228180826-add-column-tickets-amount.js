module.exports = {
	async up(queryInterface, Sequelize) {
		try {

			await queryInterface.addColumn(
			  'events',
			  'tickets_amount',
			  {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0,
			  },
			);
		} catch (error) {
			console.log(error, 'erro')
		}
	},
	async down(queryInterface) {
	  await queryInterface.removeColumn(
		'events',
		'tickets_amount',
	  );
	},
  };
