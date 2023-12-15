import request from 'supertest';
import app from '../server';
import { db } from '../src/config/db';

describe('Database Connection Test', () => {
  // beforeAll(async () => {
  //   try {
  //     await db.authenticate();
  //     console.log('Connection has been established successfully.');
  //   } catch (error) {
  //     console.error('Unable to connect to the database:', error);
  //   }
  // });


  test('GET / should return welcome message after a delay', async () => {
    setTimeout(async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Welcome');
      // done(); // Don't forget to call done() to signal the test completion
    }, 1000); // Adjust the delay time as needed
  });
});
