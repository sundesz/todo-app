/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import supertest from 'supertest';
import app from '../src/app';
import { connectToDatabase } from '../src/db';
import { Task, User } from '../src/db/models';
import bcrypt from 'bcrypt';
import { SALT } from '../src/config';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const api = supertest(app);

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
});

test('login with correct credentials', async () => {
  await api
    .get('/api/v1/login')
    .send({ username: 'sundesz@gmail.com', password: 'sandesh' })
    .expect(200);
});

// describe('login', () => {

//   // test('login with incorrect credentials', async () => {
//   //   await api
//   //     .get('/api/v1/login')
//   //     .send({ username: 'sandesh', password: 'sandesh' })
//   //     .expect('404');
//   // });
// });
