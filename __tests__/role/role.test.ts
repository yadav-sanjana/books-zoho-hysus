import request from 'supertest';
import dotenv from 'dotenv';

dotenv.config();
const Base_url  = process.env.BASE_URL

describe('role api to fetch customer list', () => {
    test('should return role list successfully', async () => {
        jest.setTimeout(15000)
        const roleList = await request(Base_url).get('/role')
        expect(roleList.statusCode).toBe(200)
        expect(roleList.body).not.toBe(null)

        console.log(roleList.body, "role body")
    })
})

