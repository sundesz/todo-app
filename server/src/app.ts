import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import userRouter from './api/routers/user';
import taskRouter from './api/routers/task';
import loginRouter from './api/routers/login';
// require('express-async-errors');
import {
  errorHandler,
  isValidUser,
  tokenExtractor,
  unknownEndpoint,
} from './middleware';
import { JwtPayload } from 'jsonwebtoken';
import { ITaskAttribute } from './db/models';
import testingRouter from './api/routers/testing';
import taskController from './api/controllers/tasks';
import cookieParser from 'cookie-parser';
import { csrfProtection } from './middleware/helper';
// import csurf from 'csurf';

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
app.use(express.static('build'));
app.use(cookieParser());
// app.use(csurf({ cookie: true }));

app.get('/', (_req: Request, res: Response) => {
  res.send('<h1>Sandesh Hyoju - Todo app</h1>');
});

app.get('/ping', (_req: Request, res: Response) => {
  res.send('pong');
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', tokenExtractor, isValidUser, taskRouter);
app.use('/api/v1/', loginRouter);
app.get('/api/v1/csrfToken', csrfProtection, taskController.getCSRFToken);

if (process.env.NODE_ENV === 'test') {
  app.use('/api/v1/testing', testingRouter);
}

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
