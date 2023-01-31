import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import userRouter from './api/routers/userRouter';
import taskRouter from './api/routers/taskRouter';
import authRouter from './api/routers/authRouter';
import {
  errorHandler,
  isValidUser,
  tokenExtractor,
  unknownEndpoint,
} from './middleware';
import { JwtPayload } from 'jsonwebtoken';
import { ITaskAttribute } from './db/models';
import testRouter from './api/routers/testRouter';
import cookieParser from 'cookie-parser';

/**
 * Custom types for Express Request
 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      decodedToken?: string | JwtPayload;
      task?: ITaskAttribute;
    }
  }
}

const app: Application = express();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

app.use(express.json());
app.use(cookieParser());

app.get('/', (_req: Request, res: Response) => {
  res.send('<h1>Sandesh Hyoju - Todo app</h1>');
});

app.get('/ping', (_req: Request, res: Response) => {
  res.send('pong');
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', tokenExtractor, isValidUser, taskRouter);
app.use('/api/v1/', authRouter);

if (process.env.NODE_ENV === 'test') {
  app.use('/api/v1/test', testRouter);
}

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
