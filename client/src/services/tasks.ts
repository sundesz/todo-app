import axios from '../axios';
import { INewTask } from '../types';

export const headerRequest = () => {
  return {
    withCredentials: true,
    // headers: { Authorization: `Bearer ${token}` },
  };
};

export const createTask = async (task: INewTask) => {
  const response = await axios.post('/tasks', task, headerRequest());
  return response.data;
};

export const updateTaskIsCompleted = async (
  taskId: string,
  isCompleted: { isCompleted: boolean }
) => {
  const response = await axios.put(
    `tasks/${taskId}`,
    isCompleted,
    headerRequest()
  );
  return response.data;
};

export const deleteTask = async (taskId: string) => {
  const response = await axios.delete(`tasks/${taskId}`, headerRequest());
  return response.data;
};
