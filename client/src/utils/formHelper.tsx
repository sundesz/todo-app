import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { ErrorMessage, Field, FieldProps } from 'formik';

const GRID_LEFT = 4;
const GRID_RIGHT = 8;

interface TextProps extends FieldProps {
  label?: string;
  placeholder?: string;
  type?: string;
}

export const CustomTextField = ({
  field,
  placeholder,
  type = 'text',
}: TextProps): JSX.Element => {
  return (
    <>
      <Field
        className="form-control"
        placeholder={placeholder}
        type={type}
        {...field}
      />

      <div style={{ color: 'red' }}>
        <ErrorMessage name={field.name} />
      </div>
    </>
  );
};

export const TextField = ({
  field,
  type = 'text',
  placeholder,
  label,
}: TextProps): JSX.Element => {
  return (
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm={GRID_LEFT}>
        {label}
      </Form.Label>
      <Col sm={GRID_RIGHT}>
        <Field
          className="form-control"
          placeholder={placeholder}
          type={type}
          {...field}
        />

        <div style={{ color: 'red' }}>
          <ErrorMessage name={field.name} />
        </div>
      </Col>
    </Form.Group>
  );
};

export const SubmitButton = ({ name }: { name: string }): JSX.Element => {
  return (
    <div className="mb-3 row">
      <Col sm={{ span: GRID_RIGHT, offset: GRID_LEFT }}>
        <Button type="submit">{name}</Button>
      </Col>
    </div>
  );
};
