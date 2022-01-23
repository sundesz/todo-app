import { FormikHelpers } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useToken from '../../hooks/useToken';
import { createTask } from '../../state/action-creators';
import { IAppState } from '../../state/action-types';
import { FilterType } from '../../types';
import Home from '../Home';
import Task from './Task';
import TaskForm from './TaskForm';
import TaskHeaderActions from './TaskHeaderActions';

const Tasks = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: IAppState) => state.user);
  const tasks = useSelector((state: IAppState) => state.task.tasks);
  const { token } = useToken();
  // const taskInputRef = React.useRef<HTMLInputElement>(null);
  const [filter, setFilter] = React.useState<FilterType>('all');

  const taskSubmitHandler = (
    values: { task: string },
    actions: FormikHelpers<{ task: string }>
  ) => {
    dispatch(createTask({ content: values.task, isCompleted: false }, token));
    actions.resetForm();

    // if (taskInputRef && taskInputRef.current) {
    //   taskInputRef.current.focus();
    // }
  };

  const headerActionsHandler = (value: FilterType) => {
    setFilter(() => value);
  };

  if (!user.authentication) {
    return <Home />;
  }

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
  }

  return (
    <>
      {tasks.length && (
        <TaskHeaderActions
          filter={filter}
          filterOnClick={headerActionsHandler}
        />
      )}

      {tasks.length === 0 && (
        <div className="no-tasks">No Tasks. Please add tasks</div>
      )}

      {taskNode.map((task) => (
        <Task key={task.taskId} task={task} />
      ))}

      <br />

      <div className="add-task-container">
        {/* <TaskForm onSubmit={taskSubmitHandler} taskInputRef={taskInputRef} /> */}
        <TaskForm onSubmit={taskSubmitHandler} />
      </div>
    </>
  );
};

export default Tasks;
