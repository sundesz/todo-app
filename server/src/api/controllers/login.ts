import { RequestHandler } from 'express';
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
    attributes: ['userId', 'username', 'passwordHash'],
    include: {
      model: Task,
      attributes: ['taskId', 'content', 'isCompleted'],
    },
    order: [['userId', 'DESC']],
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
    username: user.username,
    id: user.userId,
  };

  return jwt.sign(userForToken, SECRET_KEY, {
    expiresIn: COOKIE_EXPIRE_TIME,
  }); // expiresIn 2 hour
};

/**
 * Login request handler
 */
const login: RequestHandler = async (req, res) => {
  try {
    const { username, password } = req.body as {
      username: string;
      password: string;
    };

    if (!username || !password) {
      throw new Error('Invalid username or password');
    }

    const user = await getUser(username);

    if (user) {
      const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

      if (!passwordCorrect) {
        throw new Error('Invalid password');
      }

      const token = generateToken(user);

      res
        .cookie('token', token, {
          httpOnly: true,
          maxAge: COOKIE_EXPIRE_TIME,
        })
        .status(200)
        .json({ token, username: user.username, tasks: user.tasks });
    } else {
      res.status(400).json({ error: 'Incorrect username' });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

/**
 * Cannot use req.cookie method here as every time browser refresh token disappears. So I am sending token from body using client localStorage
 * Refresh token when frontend refresh the browser
 */
const refreshToken: RequestHandler = async (req, res) => {
  console.log(req.cookies);
  const { token } = req.body as { token: string };

  if (token === null || token === undefined || token === 'undefined') {
    return res.status(204).end();
  }

  try {
    const decodeToken = jwt.verify(token, SECRET_KEY);

    const { username } = decodeToken as { username: string };
    const user = await getUser(username);

    if (user) {
      const token = generateToken(user);
      res
        .cookie('token', token, {
          httpOnly: true,
          maxAge: COOKIE_EXPIRE_TIME,
        })
        .status(200)
        .json({ token, username: user.username, tasks: user.tasks });
    }
  } catch (error) {
    res.status(204).end();
  }
};

/**
 * Logout handler
 */
const logout: RequestHandler = (_req, res) => {
  res.clearCookie('token');
  res.status(204).end();
};

export default {
  login,
  logout,
  refreshToken,
};
