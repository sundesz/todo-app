export interface ITask {
  taskId: string;
  content: string;
  isCompleted: boolean;
  userUserId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface INewTask {
  content: string;
  isCompleted: boolean;
}

export interface IUser {
  userId: string;
  username: string;
  passwordHash: string;
  createdAt?: Date;
  updateAt?: Date;
}

export interface ISignInValues {
  username: string;
  password: string;
  _csrf?: string;
}

export interface INewUserValues {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export type FilterType = 'all' | 'complete' | 'incomplete';
