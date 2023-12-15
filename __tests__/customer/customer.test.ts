import request from 'supertest';
import dotenv from 'dotenv';

dotenv.config();
const Base_url = process.env.BASE_URL

describe('customer api to fetch customer list', () => {
    test('should return customer list successfully', async () => {
        jest.setTimeout(15000)
        const customerList = await request(Base_url).get('/customer')
        expect(customerList.statusCode).toBe(200)
        // expect(customerList.body).not.toBe(null)

        // console.log(customerList.body, "customerlist body")
    })
})
