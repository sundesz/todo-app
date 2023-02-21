import { FormikHelpers } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import ErrorPage from '../../components/Layout/ErrorPage';
import Loading from '../../components/Layout/Loading';
import { FilterType } from '../../types';
import errorNotification from '../../utils/errorNotification';
import { message } from '../../utils/notificationMessages';
import SingleTask from './SingleTask';
import { useCreateTaskMutation, useGetAllTaskQuery } from './taskApiSlice';

import TaskForm from './TaskForm';
import TaskHeaderActions from './TaskHeaderActions';

const TaskList = () => {
  const { data: tasks, error, isError, isLoading } = useGetAllTaskQuery();
  const [createTask] = useCreateTaskMutation();
  const [filter, setFilter] = React.useState<FilterType>('all');

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage error={error} />;
  }

  if (!tasks) {
    return <h1>No Tasks. Please add tasks</h1>;
  }

  const taskSubmitHandler = async (
    values: { task: string },
    actions: FormikHelpers<{ task: string }>
  ) => {
    try {
      const newTask = await createTask({ content: values.task });

      if ('error' in newTask) {
        return errorNotification(newTask.error, message.FAILED.CREATE_TASK);
      }

      toast.success(message.SUCCESS.CREATE_TASK);
      actions.resetForm();
    } catch (error) {
      errorNotification(error, message.FAILED.CREATE_TASK);
    }
  };

  const headerActionsHandler = (value: FilterType) => {
    setFilter(() => value);
  };

  let taskNode;

  switch (filter) {
    case 'all':
      taskNode = tasks;
      break;
    case 'complete':
      taskNode = tasks.filter((task) => task.isCompleted);
      break;
    case 'incomplete':
      taskNode = tasks.filter((task) => !task.isCompleted);
      break;
    case 'important':
      taskNode = tasks.filter((task) => !task.isCompleted && task.important);
  }

  return (
    <>
      {tasks.length !== 0 && (
        <TaskHeaderActions
          filter={filter}
          filterOnClick={headerActionsHandler}
        />
      )}

      <br />

      <div className="task-lists">
        {tasks.length === 0 && (
          <div className="no-tasks">No Tasks. Please add tasks</div>
        )}

        {taskNode.map((task) => (
          <SingleTask key={task.taskId} task={task} />
        ))}
      </div>

      <br />

      <div className="add-task-container">
        <TaskForm onSubmit={taskSubmitHandler} />
      </div>
    </>
  );
};

export default TaskList;
