/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import supertest from 'supertest';
import app from '../src/app';
import { connectToDatabase } from '../src/db';
import { Task, User } from '../src/db/models';
import bcrypt from 'bcrypt';
import { SALT } from '../src/config';
// import sequelize from 'sequelize';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const api = supertest(app);
let token = '';

beforeEach(async () => {
  await connectToDatabase();

  // truncate table
  await Task.sync({ force: true });
  await User.sync({ force: true });

  const passwordHash = await bcrypt.hash('sandesh', Number(SALT));

  await User.create({
    name: 'sandesh',
    username: 'sundesz@gmail.com',
    passwordHash,
  });

  const login = await api
    .post('/api/v1/login')
    .send({ username: 'sundesz@gmail.com', password: 'sandesh' });

  token = login.body.token;
});

test('test', async function () {
  await api.get('/ping').expect(200);
});

describe('login', () => {
  test('login with correct credentials', async () => {
    await api
      .post('/api/v1/login')
      .send({ username: 'sundesz@gmail.com', password: 'sandesh' })
      .expect(200);
  });

  test('login with incorrect credentials', async () => {
    await api
      .post('/api/v1/login')
      .send({ username: 'sandesh', password: 'sandesh' })
      .expect(400)
      .expect({ error: 'Invalid username or password' });
  });
});

describe('Without Authentication header', () => {
  test('task can be created without authentication header', async () => {
    const newTask = {
      content: 'This is a new task',
    };
    await api.post('/api/v1/tasks').send(newTask).expect(401);
  });
});

describe('create of new task', () => {
  test('new task can be created', async () => {
    const newTask = {
      content: 'This is a new task',
    };
    await api
      .post('/api/v1/tasks')
      .send(newTask)
      .auth(token, { type: 'bearer' })
      .expect(200);
  });
});

describe('When there is a task', () => {
  let taskId: string;
  beforeEach(async () => {
    const newTask = {
      content: 'This is a new task',
    };
    const response = await api
      .post('/api/v1/tasks')
      .send(newTask)
      .auth(token, { type: 'bearer' })
      .expect(200);

    taskId = response.body.taskId;
  });

  test('there is 1 task', async () => {
    const task = await Task.count();
    expect(task).toBe(1);
  });

  test('task can be updated', async () => {
    await api
      .put(`/api/v1/tasks/${taskId}`)
      .auth(token, { type: 'bearer' })
      .send({ isCompleted: 'true' })
      .expect(200);
  });

  test('task can be deleted', async () => {
    await api
      .del(`/api/v1/tasks/${taskId}`)
      .auth(token, { type: 'bearer' })
      .expect(204);
  });
});
