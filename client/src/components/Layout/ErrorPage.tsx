import { Container } from 'react-bootstrap';
import { isFetchBaseQueryError } from '../../utils/fetchQueryHelper';

import Page404 from './Page404';

const ErrorPage = ({ error }: { error: unknown }) => {
  if (
    isFetchBaseQueryError(error) &&
    (error.status >= 400 || error.status < 500)
  ) {
    return <Page404 />;
  }

  let errorMessage = JSON.stringify(error);

  if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <Container className="p-5">
      <div className="display-5 fw-bold text-center">{errorMessage}</div>
    </Container>
  );
};

export default ErrorPage;
