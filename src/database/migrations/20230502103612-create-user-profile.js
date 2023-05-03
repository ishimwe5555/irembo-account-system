import { v4 as uuidv4 } from 'uuid';
import { DataTypes } from 'sequelize';

const migration = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_profile_data', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      profile_picture: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      birthdate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      id_number: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      id_image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      marital_status: {
        type: DataTypes.ENUM('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED'),
        allowNull: true,
      },
      nationality: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addConstraint('user_profile_data', {
      type: 'foreign key',
      name: 'fk_user_profile_data_userId',
      fields: ['userId'],
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeConstraint(
      'user_profile_data',
      'fk_user_profile_data_userId'
    );
    await queryInterface.dropTable('user_profile_data');
  },
};
export default migration;
