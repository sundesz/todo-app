import { RequestHandler, NextFunction } from 'express';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { REFRESH_TOKEN_SECRET } from '../../config';
import { IUsername } from '../../types';
import { generateAccessToken, getUser } from '../../middleware/helper';

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
const handleRefreshToken: RequestHandler = async (
  req,
  res,
  next: NextFunction
) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || '');

    if (!cookies?.refresh_token) {
      return res.status(200).end();
    }

    const refreshToken = cookies.refresh_token;

    const { username } = jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET
    ) as IUsername;

    const foundUser = await getUser(username);

    if (foundUser) {
      const accessToken = generateAccessToken(foundUser);
      res.json({
        userInfo: {
          userId: foundUser.userId,
          name: foundUser.name,
          username: foundUser.username,
        },
        accessToken,
      });
    }
  } catch (error) {
    next(error);
  }
};

export default {
  handleRefreshToken,
};
