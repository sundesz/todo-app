import axios from '../axios';
import { INewTask } from '../types';

export const headerRequest = () => {
  return {
    withCredentials: true,
  };
};

export const createTask = async (task: INewTask) => {
  const response = await axios.post('/tasks', task, headerRequest());
  return response.data;
};

export const updateTask = async (
  taskId: string,
  body: { isCompleted: boolean; important: boolean }
) => {
  const response = await axios.put(`tasks/${taskId}`, body, headerRequest());
  return response.data;
};

export const deleteTask = async (taskId: string) => {
  const response = await axios.delete(`tasks/${taskId}`, headerRequest());
  return response.data;
};
