import { RequestHandler } from 'express';
import { errorHandler } from './errorHandler';
import { verifyAccessToken } from './helper';

const unknownEndpoint: RequestHandler = (req, res) => {
  res.status(404).json({ error: `Unknown Endpoint ${req.originalUrl}` });
};

export { errorHandler, unknownEndpoint, verifyAccessToken };
