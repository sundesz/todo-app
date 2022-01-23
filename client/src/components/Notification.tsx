import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from '../state/action-types';
import { resetNotification } from '../state/action-creators';

const DismissibleAlert = (): JSX.Element => {
  const dispatch = useDispatch();
  const [show, setShow] = React.useState<boolean>(true);
  const notification = useSelector((state: IAppState) => state.notification);

  const alertCloseHandler = () => {
    dispatch(resetNotification());
    setShow(false);
    setShow(true);
  };

  if (show && notification.message.length) {
    return (
      <Alert
        className="notification"
        variant={notification.type}
        onClose={alertCloseHandler}
        dismissible
      >
        {notification.message}
      </Alert>
    );
  }

  return <></>;
};

const Notification: React.FC = (): JSX.Element => {
  return <DismissibleAlert />;
};

export default Notification;
