import { ErrorRequestHandler } from 'express';
import { errMessage } from '../utils/errorMessage';

export const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  switch (error.name) {
    case 'SequelizeUniqueConstraintError':
      return res.status(400).json(error.errors[0].message as string);
    case 'SequelizeValidationError':
      return res.status(400).json(error.errors[0].message as string);
    case 'TokenExpiredError':
      return res.status(400).json(errMessage.EXPIRED_TOKEN);
    case 'JsonWebTokenError':
      const message =
        error.message === 'invalid signature'
          ? 'Invalid token'
          : (error.message as string);
      return res.status(401).json(message);
    default:
      return res.status(400).json(error.message as string);
  }
  next(error);
};
