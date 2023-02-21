import { NextFunction, RequestHandler } from 'express';

import bcrypt from 'bcrypt';
import { SALT } from '../../config';
import { User } from '../../db/models';
import { NewUserInputType } from '../../types';

/**
 * Create user
 */

const createUser: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    // const newUser: NewUserInputType = {
    //   name: req.body.name,
    //   username: req.body.username,
    //   password: req.body.password,
    // };

    const { name, username, password } = req.body.name as NewUserInputType;

    const passwordHash = await bcrypt.hash(password, Number(SALT));

    const user = await User.create({
      username,
      name,
      passwordHash,
      isActive: true,
      role: 'user',
    });

    res.json(user);
    // res.status(201).json({ message: 'User created' });
  } catch (error: unknown) {
    next(error);
  }
};

export default {
  createUser,
};
