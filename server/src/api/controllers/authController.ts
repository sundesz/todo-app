import { NextFunction, RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import cookie from 'cookie';
import {
  COOKIE_EXPIRE_TIME,
  COOKIE_NAME_FOR_REFRESH_TOKEN,
} from '../../config';
import { errMessage } from '../../utils/errorMessage';
import { CredentialType } from '../../types';
import {
  generateAccessToken,
  generateRefreshToken,
  getUser,
} from '../../middleware/helper';

/**
 * Login request handler
 */
const handleLogin: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    const { username, password } = req.body as CredentialType;

    if (!username || !password) {
      return res.status(400).json(errMessage.REQUIRED_USER_PASS);
    }

    const user = await getUser(username);
    if (!user) {
      return res.status(401).json(errMessage.INVALID_USER_PASS);
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      return res.status(401).json(errMessage.INVALID_USER_PASS);
    }

    const refreshToken = generateRefreshToken(user);
    const accessToken = generateAccessToken(user);

    return res
      .setHeader(
        'Set-Cookie',
        cookie.serialize(COOKIE_NAME_FOR_REFRESH_TOKEN, refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: COOKIE_EXPIRE_TIME,
          path: '/',
        })
      )
      .status(200)
      .json({
        userInfo: {
          userId: user.userId,
          name: user.name,
          username: user.username,
        },
        accessToken,
      });
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Logout handler
 */
const handleLogout: RequestHandler = (_req, res) => {
  res.setHeader('Set-Cookie', '');
  res.clearCookie(COOKIE_NAME_FOR_REFRESH_TOKEN, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });
  res.status(204).end();
};

export default {
  handleLogin,
  handleLogout,
};
