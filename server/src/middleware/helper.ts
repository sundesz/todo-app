import { NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { Task, User } from '../db/models';
import {
  ACCESS_TOKEN_EXPIRE_TIME,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRE_TIME,
  REFRESH_TOKEN_SECRET,
} from '../config';
import { AccessTokenType, RefreshTokenType } from '../types';

/**
 * Verify Access Token and validate user
 */
export const verifyAccessToken: RequestHandler = async (
  req,
  res,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.toLowerCase().startsWith('bearer')) {
      return res.sendStatus(401);
    }

    const token = authHeader.substring(7);
    const decodedToken = jwt.verify(
      token,
      ACCESS_TOKEN_SECRET
    ) as AccessTokenType;

    const foundUser = await getUser(decodedToken.userInfo.username);

    if (!foundUser) {
      return res.sendStatus(401);
    }

    req.decodedToken = {
      username: foundUser.username,
      userId: foundUser.userId,
    };
  } catch (error) {
    next(error);
  }

  next();
};

/**
 * Finds tasks by taskId
 */
export const taskFinder: RequestHandler = async (req, res, next) => {
  try {
    const { id: taskId } = req.params as { id: string };
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.sendStatus(404);
    }

    req.task = task;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Find one user by username
 */
export const getUser = async (username: string) => {
  return await User.findOne({
    where: { username, isActive: true },
    attributes: ['userId', 'name', 'username', 'passwordHash', 'role'],
    include: {
      model: Task,
      attributes: ['taskId', 'content', 'isCompleted', 'important'],
    },
    order: [[Task, 'createdAt', 'asc']],
  });
};

/**
 * Generates access token
 */
export const generateAccessToken = (user: User) => {
  if (user === null) {
    throw new Error('User not found');
  }

  const tokenObj: AccessTokenType = {
    userInfo: {
      name: user.name,
      username: user.username,
      userId: user.userId,
      role: user.role,
    },
  };

  return jwt.sign(tokenObj, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
  });
};

/**
 * Generates access and refresh token
 */
export const generateRefreshToken = (user: User) => {
  if (user === null) {
    throw new Error('User not found');
  }

  const tokenObj: RefreshTokenType = {
    username: user.username,
  };

  return jwt.sign(tokenObj, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
  });
};
