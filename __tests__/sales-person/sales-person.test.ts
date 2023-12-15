import request from 'supertest'
import dotenv from 'dotenv';

dotenv.config();
const Base_url  = process.env.BASE_URL

describe('sales-person fetch all sales-person list api', () => {
    test('should return list successfully', async() => {
        jest.setTimeout(15000)
        const salesPersonList = await request(Base_url).get('/sales-person')
        expect(salesPersonList.statusCode).toBe(200)
     })
})