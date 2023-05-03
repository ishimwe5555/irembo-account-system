import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import User from './user.model';

const UserProfile = sequelize.define('user_profile_data', {
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
      model: User,
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
});

UserProfile.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
});

export default UserProfile;
