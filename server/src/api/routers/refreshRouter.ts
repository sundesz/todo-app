import { Router } from 'express';
import refreshController from '../controllers/refreshTokenController';

const refreshRouter = Router();

refreshRouter.get('/', refreshController.handleRefreshToken);

export default refreshRouter;
