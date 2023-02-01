import { DataTypes } from 'sequelize';
import { Migration } from '..';

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('users', 'role', {
    type: DataTypes.STRING,
  });

  await queryInterface.addColumn('users', 'is_active', {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  });
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('users', 'role');
  await queryInterface.removeColumn('users', 'is_active');
};
