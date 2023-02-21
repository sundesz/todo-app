import { formatRelative } from 'date-fns';
import { Pencil, Trash } from 'react-bootstrap-icons';
import { ITask, UpdateModeType, UpdateTaskParameter } from '../../types';

interface IModeReadProps {
  task: ITask;
  updateTaskHandler: (
    task: ITask,
    parameter: UpdateTaskParameter,
    updateType: UpdateModeType
  ) => Promise<false | undefined>;
  deleteTaskHandler: (taskId: string) => Promise<void>;
  setUpdateMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModeRead: React.FC<IModeReadProps> = ({
  task,
  updateTaskHandler,
  deleteTaskHandler,
  setUpdateMode,
}): JSX.Element => {
  return (
    <div className="task-detail">
      <div className="td-col-1">
        <input
          type="checkbox"
          checked={task.isCompleted}
          className="task-checkbox"
          onChange={() =>
            updateTaskHandler(
              task,
              { isCompleted: !task.isCompleted, important: false },
              'changeCompleted'
            )
          }
        />
      </div>

      <div className="td-col-2">
        <div
          className={`task-label ${
            task.isCompleted
              ? 'delete-text'
              : task.important
              ? 'task-important'
              : 'cursor-pointer'
          }`}
          title={
            task.isCompleted
              ? 'Task completed'
              : task.important
              ? 'This is important'
              : 'Click to mark this task as important'
          }
          onDoubleClick={() =>
            updateTaskHandler(
              task,
              { important: !task.important },
              'changeImportant'
            )
          }
        >
          {task.content}{' '}
        </div>
        <small title={task.updatedAt}>
          {formatRelative(new Date(task.updatedAt!), new Date())}
        </small>
      </div>

      <div className="td-col-3">
        <div className="btn-group" role="group" aria-label="Task controls">
          <button
            type="button"
            className="btn btn-secondary"
            title="Edit"
            onClick={() => setUpdateMode(() => true)}
            disabled={task.isCompleted}
          >
            <Pencil size={20} />
          </button>
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

export default ModeRead;
