import { Router } from 'express';
import { taskFinder, verifyAccessToken } from '../../middleware/helper';
import taskController from '../controllers/taskController';

const taskRouter = Router();

taskRouter.use(verifyAccessToken);

taskRouter.get('/', taskController.getAllTasks);
taskRouter.post('/', taskController.createTask);
taskRouter.put('/:id', taskFinder, taskController.updateTask);
taskRouter.delete('/:id', taskFinder, taskController.deleteTask);

export default taskRouter;
