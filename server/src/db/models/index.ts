import User from './user';
import Task, { ITaskAttribute } from './task';

User.hasMany(Task);
Task.belongsTo(User);

export { User, Task, ITaskAttribute };
