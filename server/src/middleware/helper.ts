import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { Task, User } from '../db/models';
import { SECRET_KEY } from '../config';

/**
 * Extract token from request
 */
export const tokenExtractor: RequestHandler = (req, res, next) => {
  const authorization = req.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET_KEY);
    } catch (error) {
      return res.status(401).json({ error: 'Invalid Token' });
    }
  } else {
    return res.status(401).json({ error: 'Missing Token' });
  }

  next();
};

/**
 * Checks if user is a valid or not
 */
export const isValidUser: RequestHandler = async (req, res, next) => {
  const { id } = req.decodedToken as { id: string };
  const user = await User.findByPk(id);

  if (!user) {
    return res
      .status(401)
      .json({ error: 'Invalid Token. Please login again.' });
  }

  next();
};

/**
 * Finds tasks by taskId
 */
export const taskFinder: RequestHandler = async (req, res, next) => {
  const { id: taskId } = req.params as { id: string };
  const task = await Task.findByPk(taskId);

  if (task) {
    req.task = task;
  } else {
    return res.status(404).end();
  }

  next();
};
