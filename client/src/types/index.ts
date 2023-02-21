export interface ITask {
  taskId: string;
  content: string;
  isCompleted: boolean;
  important: boolean;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface INewTask {
  content: string;
  isCompleted: boolean;
  important: boolean;
}

export interface IUser {
  userId: string;
  username: string;
  passwordHash: string;
  createdAt?: string;
  updateAt?: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface INewUserValues {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export type FilterType = 'all' | 'complete' | 'incomplete' | 'important';

export interface ILoginResponse {
  userInfo: IUserInfo;
  accessToken: string;
}

export interface IUserInfo {
  userId: string;
  username: string;
  name: string;
}

export interface INewUserResponse {
  message: string;
}

export interface INewUser {
  name: string;
  username: string;
  password: string;
}

export interface IGetTaskResponse {
  tasks: ITask[];
}

export type NewTaskType = Pick<ITask, 'content'>;
export type TaskIdType = ITask['taskId'];

export type UpdateTaskParameter = Partial<
  Pick<ITask, 'isCompleted' | 'important' | 'content'>
>;

export type UpdateTaskType = Pick<ITask, 'taskId'> & UpdateTaskParameter;

export type UpdateModeType = 'update' | 'changeImportant' | 'changeCompleted';
