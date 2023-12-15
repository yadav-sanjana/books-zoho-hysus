import request from 'supertest';
import app from '../server';
import { db } from '../src/config/db';
// beforeAll(async () => {
//   try {
//     await db.authenticate();
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// });
// afterAll(async () => {
//   await db.close();
// });

describe('Database Connection Test', () => {
  test('GET / should return welcome message after a delay', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Welcome');
  });
});

