import { RequestHandler } from 'express';

import bcrypt from 'bcrypt';
import { SALT } from '../../config';
import { User } from '../../db/models';

/**
 * Create user
 */

const createUser: RequestHandler = async (req, res) => {
  try {
    const { name, username, password } = req.body as {
      name: string;
      username: string;
      password: string;
    };

    const passwordHash = await bcrypt.hash(password, Number(SALT));

    const user = await User.create({
      username,
      name,
      passwordHash,
    });

    res.json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      // res.status(400).json({ error: errors[0].message });
      res.status(400).json({ error: error.message });
    }
  }
};

export default {
  createUser,
};
