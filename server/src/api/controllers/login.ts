import { NextFunction, RequestHandler, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { COOKIE_EXPIRE_TIME, SECRET_KEY } from '../../config';
import { Task, User } from '../../db/models';

/**
 * Find one user by username
 * @param username string
 * @returns User | null
 */
const getUser = async (username: string) => {
  return await User.findOne({
    where: { username },
    attributes: ['userId', 'name', 'username', 'passwordHash'],
    include: {
      model: Task,
      attributes: ['taskId', 'content', 'isCompleted'],
    },
    order: [[Task, 'createdAt', 'asc']],
  });
};

/**
 * Generates token for frontend users
 * @param user
 * @returns generateToken
 */
const generateToken = (user: User) => {
  if (user === null) {
    throw new Error('User not found');
  }

  const userForToken = {
    name: user.name,
    username: user.username,
    id: user.userId,
  };

  return jwt.sign(userForToken, SECRET_KEY, {
    expiresIn: 5 * 1000 * 60,
  }); // expiresIn 2 hour
};

/**
 * Login request handler
 */
const login: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    const { username, password } = req.body as {
      username: string;
      password: string;
    };

    if (!username || !password) {
      throw new Error('Invalid username or password');
    }

    const user = await getUser(username);
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      throw new Error('Invalid username or password');
    }

    loginAndRefreshTokenResponse(res, user);
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Cannot use req.cookie method here as every time browser refresh token disappears. So I am sending token from body using client localStorage
 * Refresh token when frontend refresh the browser
 */
const refreshToken: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    const { username } = req.decodedToken as { username: string };
    const user = await getUser(username);

    if (user) {
      loginAndRefreshTokenResponse(res, user);
    }
  } catch (error) {
    res.status(200).end();
    next(error);
  }
};

/**
 * Logout handler
 */
const logout: RequestHandler = (_req, res) => {
  res.clearCookie('token');
  res.status(204).end();
};

const loginAndRefreshTokenResponse = (res: Response, user: User) => {
  const token = generateToken(user);
  return res
    .cookie('token', token, {
      httpOnly: true,
      maxAge: COOKIE_EXPIRE_TIME,
    })
    .status(200)
    .json({
      token,
      name: user.name,
      username: user.username,
      tasks: user.tasks,
    });
};

const getCSRFToken: RequestHandler = (req, res) => {
  res.json({ CSRFToken: req.csrfToken() });
};

export default {
  login,
  logout,
  refreshToken,
  getCSRFToken,
};
