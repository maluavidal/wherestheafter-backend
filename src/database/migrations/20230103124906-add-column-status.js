module.exports = {
	async up(queryInterface, Sequelize) {
		try {

			await queryInterface.addColumn(
			  'events',
			  'status',
			  {
				type: Sequelize.ENUM,
				values: [
					'ongoing',
					'over',
					'disabled'
				],
				allowNull: false,
				defaultValue: 'ongoing'
			  },
			);
		} catch (error) {
			console.log(error, 'erro')
		}
	},
	async down(queryInterface) {
	  await queryInterface.removeColumn(
		'events',
		'status',
	  );
	},
  };
