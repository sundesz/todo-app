import React from 'react';
import { Trash } from 'react-bootstrap-icons';
import { ITask } from '../../types';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../../state/action-creators';

interface ITaskComponent {
  task: ITask;
}

const Task: React.FC<ITaskComponent> = ({ task }): JSX.Element => {
  const [checkboxValue, setCheckboxValue] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const changeCompletedHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    taskId: string
  ) => {
    const body = {
      isCompleted: !checkboxValue,
      important: !checkboxValue ? false : task.important,
    };
    setCheckboxValue((value) => !value);
    dispatch(updateTask(taskId, body));
  };

  // Only Incomplete tasks can be made important
  const changeImportantHandler = (taskId: string) => {
    if (!checkboxValue) {
      const body = { isCompleted: checkboxValue, important: !task.important };
      dispatch(updateTask(taskId, body));
    }
  };

  const deleteTaskHandler = (taskId: string) => {
    const confirm = window.confirm('Are you sure you want to delete?');
    if (confirm) {
      dispatch(deleteTask(taskId));
    }
  };

  React.useEffect(() => {
    setCheckboxValue(task.isCompleted);
  }, []);

  return (
    <div className="task-detail">
      <div className="td-col-1">
        <input
          type="checkbox"
          checked={checkboxValue}
          className="task-checkbox"
          onChange={(e) => changeCompletedHandler(e, task.taskId)}
        />
      </div>

      <div className="td-col-2">
        <label
          className={`task-label ${
            checkboxValue
              ? 'delete-text'
              : task.important
              ? 'task-important'
              : 'cursor-pointer'
          }`}
          title={
            checkboxValue
              ? 'Task completed'
              : task.important
              ? 'This is important'
              : 'Click to mark this task as important'
          }
          onClick={() => changeImportantHandler(task.taskId)}
        >
          {task.content}
        </label>
      </div>

      <div className="td-col-3">
        <div className="btn-group" role="group" aria-label="Task controls">
          {/* <button
            type="button"
            className="btn btn-secondary"
            title="Edit"
            onClick={() => updateTaskHandler(task.taskId)}
          >
            <Pencil size={20} />
          </button> */}
          <button
            type="button"
            className="btn btn-danger task-delete"
            title="Delete"
            onClick={() => deleteTaskHandler(task.taskId)}
          >
            <Trash size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
