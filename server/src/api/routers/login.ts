import { Router } from 'express';
import loginController from '../controllers/login';

const loginRouter = Router();

loginRouter.post('/login', loginController.login);
loginRouter.post('/logout', loginController.logout);
loginRouter.post('/refreshtoken', loginController.refreshToken);

export default loginRouter;
