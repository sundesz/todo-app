import React from 'react';
import * as Yup from 'yup';
import { Field, Formik, Form, FormikHelpers } from 'formik';
import { CustomTextField } from '../../utils';
import { Button, Col, Row } from 'react-bootstrap';

interface TaskForm {
  onSubmit: (
    values: { task: string },
    actions: FormikHelpers<{ task: string }>
  ) => void;
}

const TaskForm: React.FC<TaskForm> = ({ onSubmit }) => {
  const INITIAL_VALUES = {
    task: '',
  };

  const VALIDATION_SCHEMA = Yup.object().shape({
    task: Yup.string()
      .min(3, 'Task should be at least 3 character long')
      .max(25, 'Task should not be more than 25 characters long')
      .required('Task required'),
  });

  return (
    <>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={(values, actions) => onSubmit(values, actions)}
      >
        {() => (
          <Form>
            <Row className="justify-content-center">
              <Col sm={10} className="my-1">
                <Field
                  id="task"
                  name="task"
                  placeholder="Task description ..."
                  component={CustomTextField}
                />
              </Col>

              <Col xs="auto" className="my-1">
                <Button id="addtask-btn" type="submit">
                  Add task
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default TaskForm;
