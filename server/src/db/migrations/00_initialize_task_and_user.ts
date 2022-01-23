import { DataTypes, QueryInterface } from "sequelize";

export {

  up: async(queryInterface: QueryInterface) => {

    await queryInterface.createTable('tasks',  {
      taskId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    })

    await queryInterface.createTable('users',
            {
        userId: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        passwordHash: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },

    })

    await queryInterface.addColumn('tasks', 'user_id', {
      type: DataTypes.UUID,
      allowNull: false,
      references: {model: 'users', key: 'user_id'},
    })
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('tasks')
    await queryInterface.dropTable('users')
  }
}