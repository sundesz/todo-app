import { NextFunction, RequestHandler } from 'express';
import { Op } from 'sequelize';
import { Task } from '../../db/models';
import { parseBoolean } from '../../utils';
/**
 * Get all tasks by userId
 */
const getAllTasks: RequestHandler = async (req, res, next: NextFunction) => {
  const { userId } = req.decodedToken as { userId: string };

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
      attributes: { exclude: ['userId'] },
      where: {
        userId: userId,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        isCompleted,
      },
    });
    res.json(tasks);
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Create new task
 */
const createTask: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    const { content } = req.body as { content: string };
    const { userId } = req.decodedToken as { userId: string };

    const task = await Task.create({
      content,
      userId,
      isCompleted: false,
      important: false,
    });

    res.json(task);
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Update task
 */
const updateTask: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    const task = req.task as Task;
    const { isCompleted, important } = req.body as {
      isCompleted: string;
      important: string;
    };

    task.isCompleted = parseBoolean(isCompleted);
    task.important = parseBoolean(important);
    await task.save();

    res.json(task);
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * delete task
 */
const deleteTask: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    const task = req.task as Task;
    await task.destroy();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
