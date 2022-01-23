import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../index';

export interface ITaskAttribute {
  taskId: string;
  content: string;
  isCompleted?: boolean;
  userUserId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// defines the type of the object passed to Sequelize’s model.create
export type ITaskInput = Omit<ITaskAttribute, 'taskId'>;

// defines the returned object from model.create, model.update, and model.findOne
export type ITaskOutput = Omit<ITaskAttribute, 'userUserId'>;

class Task extends Model<ITaskAttribute, ITaskInput> implements ITaskAttribute {
  public taskId!: string;
  public content!: string;
  public isCompleted!: boolean;
  public userUserId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Task.init(
  {
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
    // we don't need this as we join the table using sequelize hasMany and belongsto method
    // userId: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    //   unique: true,
    //   references: {
    //     model: 'users',
    //     key: 'user_id',
    //   },
    // },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'task',
  }
);

export default Task;
