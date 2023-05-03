import { DataTypes } from 'sequelize';

export async function up(queryInterface) {
  await queryInterface.addColumn('users', 'role', {
    type: DataTypes.ENUM('ADMIN', 'USER'),
    defaultValue: 'USER',
  });
}
export async function down(queryInterface) {
  await queryInterface.removeColumn('users', 'role');
}
