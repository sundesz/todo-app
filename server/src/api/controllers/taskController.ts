import { NextFunction, RequestHandler } from 'express';
import { Op } from 'sequelize';
import { Task } from '../../db/models';

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
      attributes: { exclude: ['user_id'] },
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
    console.log(error);
    next(error);
  }
};

/**
 * Update task
 */
const updateTask: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    const task = req.task as Task;
    const { isCompleted, important, content } = req.body as {
      content: string;
      isCompleted: boolean;
      important: boolean;
    };

    task.content = content ?? task.content;
    task.isCompleted = isCompleted ?? task.isCompleted;
    task.important = important ?? task.important;
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

    res.status(204).end();
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
