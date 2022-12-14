module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await Promise.all([
				queryInterface.createTable('users', {
					id: {
						type: Sequelize.INTEGER,
						allowNull: false,
						autoIncrement: true,
						primaryKey: true,
					},
					name: {
						type: Sequelize.STRING,
						allowNull: false,
					},
					email: {
						type: Sequelize.STRING,
						validate: {
							isEmail: true,
						},
						allowNull: false,
						unique: true,
					},
					password_hash: {
						type: Sequelize.STRING,
						allowNull: false
					},
					is_admin: {
						type: Sequelize.BOOLEAN,
						allowNull: false
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
				}, { transaction }),

				queryInterface.createTable('clients', {
					id: {
						type: Sequelize.INTEGER,
						allowNull: false,
						autoIncrement: true,
						primaryKey: true,
					},
					name: {
						type: Sequelize.STRING,
						allowNull: false,
					},
					cpf: {
						type: Sequelize.STRING(11),
						allowNull: false,
					},
					email: {
						type: Sequelize.STRING,
						allowNull: false,
					},
					born_at: {
						type: Sequelize.DATE,
						allowNull: false,
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
				}, { transaction }),
			]);

			await queryInterface.createTable('thumbs', {
				id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
 				},
				original_name: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				file_name: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				url: {
					type: Sequelize.STRING,
					allowNull: false,
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
					allowNull: true
				}
			},  { transaction });
			await queryInterface.createTable('events', {
				id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
				},
				name: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				about: {
					type: Sequelize.TEXT,
					allowNull: true,
				},
				user_id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: 'users',
						key: 'id',
					},
				},
				starts_at: {
					type: Sequelize.DATE,
					allowNull: false,
				},
				ends_at: {
					type: Sequelize.DATE,
					allowNull: true,
				},
				min_age: {
					type: Sequelize.INTEGER,
					allowNull: true,
					defaultValue: null,
				},
				address_cep: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				venue: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				street: {
					type: Sequelize.STRING,
					allowNull: true,
				},
				number: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				city: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				state: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				thumb_id: {
					type: Sequelize.INTEGER,
					allowNull: true,
					references: {
						model: 'thumbs',
						key: 'id',
					},
				},
				price: {
					type: Sequelize.FLOAT,
					allowNull: false,
					defaultValue: 0.00,
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
			}, { transaction });

			await queryInterface.createTable('events_clients', {
				id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
				},
				event_id: {
					type: Sequelize.INTEGER,
					references: {
						model: 'events',
						key: 'id',
					},
					allowNull: false,
				},
				client_id: {
					type: Sequelize.INTEGER,
					references: {
						model: 'clients',
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
			}, { transaction });

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();

			throw error;
		}
	},

	async down(queryInterface) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.dropTable('events_clients', { transaction });

			await queryInterface.dropTable('events', { transaction });

			await queryInterface.dropTable('thumbs', { transaction });


			await Promise.all([
				queryInterface.dropTable('users', { transaction }),
				queryInterface.dropTable('clients', { transaction }),
			]);

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();

			throw error;
		}
	},
};
