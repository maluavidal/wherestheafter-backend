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
				type: Sequelize.STRING,
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
			},
			event_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'events',
					key: 'id',
				},
				allowNull: false,
			},
			payment_method: {
				type: Sequelize.STRING(20),
				allowNull: true,
				defaultValue: null,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			deleted_at: {
				type: Sequelize.DATE,
				allowNull: true,
				defaultValue: null,
			},
		},
		);
	},

	async down(queryInterface) {
		await queryInterface.dropTable('payment_data');
	},
};
