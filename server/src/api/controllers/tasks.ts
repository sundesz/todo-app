import { RequestHandler } from 'express';
import { Op } from 'sequelize';
import { Task, User } from '../../db/models';
import { parseBoolean } from '../../utils';

/**
 * Get all tasks by userId
 */
const getAllTasks: RequestHandler = async (req, res) => {
  const { id: userId } = req.decodedToken as { id: string };

  // type TIsCompleted =
  //   | {
  //       [OpTypes.in]: boolean[];
  //     }
  //   | boolean;
  // let isCompleted: TIsCompleted; // this does not work

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let isCompleted: any = {
    [Op.in]: [true, false],
  };

  if (req.query.completed) {
    const { completed } = req.query as { completed: string };
    isCompleted = completed === 'true';
  }

  try {
    const tasks = await Task.findAll({
      attributes: { exclude: ['userUserId'] },
      where: {
        userUserId: userId,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        isCompleted,
      },
    });
    res.json(tasks);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(401).json({ error: error.message });
    }
  }
};

/**
 * Create new task
 */
const createTask: RequestHandler = async (req, res) => {
  try {
    const { content } = req.body as { content: string };
    const { id } = req.decodedToken as { id: string };
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('Invalid Token. Please login again.');
    }

    const task = await Task.create({ content, userUserId: user.userId });

    res.json(task);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(401).json({ error: error.message });
    }
  }
};

/**
 * Update task
 */
const updateTask: RequestHandler = async (req, res) => {
  try {
    const task = req.task as Task;
    const { isCompleted } = req.body as { isCompleted: string };

    task.isCompleted = parseBoolean(isCompleted);
    await task.save();

    res.json(task);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(401).json({ error: error.message });
    }
  }
};

/**
 * delete task
 */
const deleteTask: RequestHandler = async (req, res) => {
  try {
    const task = req.task as Task;
    void (await task.destroy());

    res.status(204).end();
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ error: error.message });
    }
  }
};

export default {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
