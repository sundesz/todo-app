import { FormikHelpers } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../state';
import { createTask } from '../../state/action-creators';
import { FilterType } from '../../types';
import Home from '../Home';
import Task from './Task';
import TaskForm from './TaskForm';
import TaskHeaderActions from './TaskHeaderActions';

const Tasks = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user);
  const tasks = useSelector((state: AppState) => state.task.tasks);

  const [filter, setFilter] = React.useState<FilterType>('all');

  // document.title = 'Todo App Tasks';

  const taskSubmitHandler = (
    values: { task: string },
    actions: FormikHelpers<{ task: string }>
  ) => {
    dispatch(
      createTask({ content: values.task, isCompleted: false, important: false })
    );
    actions.resetForm();
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
          <Task key={task.taskId} task={task} />
        ))}
      </div>

      <br />

      <div className="add-task-container">
        <TaskForm onSubmit={taskSubmitHandler} />
      </div>
    </>
  );
};

export default Tasks;
