import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import userRouter from './api/routers/userRouter';
import taskRouter from './api/routers/taskRouter';
import authRouter from './api/routers/authRouter';
import testRouter from './api/routers/testRouter';
import refreshRouter from './api/routers/refreshRouter';
import { errorHandler, unknownEndpoint } from './middleware';
import { ITaskAttribute } from './db/models';
import cookieParser from 'cookie-parser';
import { DecodeTokenType } from './types';

/**
 * Custom types for Express Request
 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      decodedToken?: DecodeTokenType;
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
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/', authRouter);
app.use('/api/v1/refresh', refreshRouter);

if (process.env.NODE_ENV === 'test') {
  app.use('/api/v1/test', testRouter);
}

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
