import { useRef } from 'react';
import { Save, XSquare } from 'react-bootstrap-icons';
import { ITask, UpdateModeType, UpdateTaskParameter } from '../../types';

interface IModeUpdateProps {
  task: ITask;
  setUpdateMode: React.Dispatch<React.SetStateAction<boolean>>;
  updateTaskHandler: (
    task: ITask,
    parameter: UpdateTaskParameter,
    updateType: UpdateModeType
  ) => Promise<false | undefined>;
}

const ModeUpdate: React.FC<IModeUpdateProps> = ({
  task,
  setUpdateMode,
  updateTaskHandler,
}): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="update-task-detail">
      <div className="td-col-1"></div>
      <div className="td-col-2">
        <input
          type="text"
          className="form-control"
          ref={inputRef}
          defaultValue={task.content}
        />
      </div>

      <div className="td-col-3">
        <div className="btn-group" role="group" aria-label="Task controls">
          <button
            type="button"
            className="btn btn-success task-update"
            title="Update"
            onClick={() =>
              updateTaskHandler(
                task,
                {
                  content: inputRef.current!.value,
                },
                'update'
              )
            }
          >
            <Save size={20} />
          </button>

          <button
            type="button"
            className="btn btn-warning task-cancel"
            title="Cancel update"
            onClick={() => setUpdateMode(() => false)}
          >
            <XSquare size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModeUpdate;
