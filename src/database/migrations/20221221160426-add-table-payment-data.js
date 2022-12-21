module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('payment_data', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			card_number: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			expiration_date: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			security_code: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			cardholder_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			cardholder_birthdate: {
				type: Sequelize.DATE,
				allowNull: false
			},
			cpf: {
				type: Sequelize.STRING,
				allowNull: false
			},
			client_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'clients',
					key: 'id',
				},
				allowNull: false,
			}
		},
		);
	},

	async down(queryInterface) {
		await queryInterface.dropTable('payment_data');
	},
};
