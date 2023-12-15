import request from 'supertest'
import dotenv from 'dotenv';

dotenv.config();
const Base_url  = process.env.BASE_URL

describe('user fetch all user list api', () => {
    test('should return list successfully', async() => {
        jest.setTimeout(15000)
        const userList = await request(Base_url).get('/user')
        expect(userList.statusCode).toBe(200)
     })
})