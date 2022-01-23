import { RequestHandler } from 'express';
import { errorHandler } from './errorHandler';
import { tokenExtractor, isValidUser } from './helper';

const unknownEndpoint: RequestHandler = (_req, res) => {
  res.status(404).json({ error: 'Unknown Endpoint' });
};

export { errorHandler, unknownEndpoint, tokenExtractor, isValidUser };
