import { useState } from 'react';
import { toast } from 'react-toastify';
import { ITask, UpdateModeType, UpdateTaskParameter } from '../../types';
import errorNotification from '../../utils/errorNotification';
import { message } from '../../utils/notificationMessages';
import ModeRead from './ModeRead';
import ModeUpdate from './ModeUpdate';
import { useDeleteTaskMutation, useUpdateTaskMutation } from './taskApiSlice';

interface ISingleTaskProps {
  task: ITask;
}

const SingleTask: React.FC<ISingleTaskProps> = ({ task }): JSX.Element => {
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateMode, setUpdateMode] = useState<boolean>(false);

  const deleteTaskHandler = async (taskId: string) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete?');
      if (confirm) {
        await deleteTask(taskId);

        toast.success(message.SUCCESS.DELETE_TASK);
      }
    } catch (error) {
      errorNotification(error, message.FAILED.DELETE_TASK);
    }
  };

  const updateTaskHandler = async (
    task: ITask,
    parameter: UpdateTaskParameter,
    updateType: UpdateModeType
  ) => {
    try {
      if (updateType === 'changeImportant' && task.isCompleted) {
        return false;
      }

      await updateTask({ taskId: task.taskId, ...parameter });
      toast.success(message.SUCCESS.UPDATE_TASK);
      setUpdateMode(() => false);
    } catch (error) {
      errorNotification(error, message.FAILED.UPDATE_TASK);
    }
  };

  return (
    <>
      {updateMode ? (
        <ModeUpdate
          task={task}
          setUpdateMode={setUpdateMode}
          updateTaskHandler={updateTaskHandler}
        />
      ) : (
        <ModeRead
          task={task}
          setUpdateMode={setUpdateMode}
          updateTaskHandler={updateTaskHandler}
          deleteTaskHandler={deleteTaskHandler}
        />
      )}
    </>
  );
};

export default SingleTask;
