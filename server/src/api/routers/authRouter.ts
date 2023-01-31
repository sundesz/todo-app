import { Router } from 'express';
import { tokenExtractor } from '../../middleware';
import authController from '../controllers/authController';

const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.post('/refresh', tokenExtractor, authController.refreshToken);

export default authRouter;
