import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { XCircleFill } from 'react-bootstrap-icons';
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
      <br />

      <Row className="align-items-center">
        <Col sm={{ span: 1, offset: 2 }}>
          <Form.Check
            type="checkbox"
            checked={checkboxValue}
            className="mb-2 task-checkbox"
            onChange={(e) => changeCompletedHandler(e, task.taskId)}
          />
        </Col>
        <Col sm="6">
          <Form.Label
            htmlFor="inlineFormInput"
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
          </Form.Label>
        </Col>
        <Col sm="2">
          <XCircleFill
            className="task-delete"
            color="red"
            size={32}
            style={{ marginBottom: 10, cursor: 'pointer' }}
            onClick={() => deleteTaskHandler(task.taskId)}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Task;
