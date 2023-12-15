import request from 'supertest'
import dotenv from 'dotenv';

dotenv.config();
const Base_url = process.env.BASE_URL

describe('term fetch all term list api', () => {
    test('should return list successfully', async () => {
        jest.setTimeout(15000)
        const termList = await request(Base_url).get('/terms')
        expect(termList.statusCode).toBe(200)
    })
})