import axios from '../axios';
import { INewTask } from '../types';
// import useToken from '../hooks/useToken';

export const headerRequest = (token: string | null) => {
  // const { token } = useToken();
  if (token) {
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  }

  return {};
};

export const createTask = async (task: INewTask, token: string | null) => {
  const response = await axios.post('/tasks', task, headerRequest(token));
  return response.data;
};

export const updateTaskIsCompleted = async (
  taskId: string,
  isCompleted: { isCompleted: boolean },
  token: string | null
) => {
  const response = await axios.put(
    `tasks/${taskId}`,
    isCompleted,
    headerRequest(token)
  );
  return response.data;
};

export const deleteTask = async (taskId: string, token: string | null) => {
  const response = await axios.delete(`tasks/${taskId}`, headerRequest(token));
  return response.data;
};
