import { ErrorRequestHandler } from 'express';

// TODO: Don't know why but errorHandler doesn't handle all errors
export const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  switch (error.name) {
    case 'SequelizeUniqueConstraintError':
      return res.status(400).json(error.message);
    case 'JsonWebTokenError':
      return res.status(400).json(error.message);

    default:
      return res.status(400).json(error);
  }
  next(error);
};
