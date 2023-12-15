import request from 'supertest';
import { CustomerModel } from '../../src/models/customer/customerModel'
import dotenv from 'dotenv';

dotenv.config();
const Base_url = process.env.BASE_URL

describe('all customer apis', () => {

    describe('customer api to fetch customer list', () => {
        test('should return customer list successfully', async () => {
            jest.setTimeout(15000)
            const customerList = await request(Base_url).get('/customer')
            expect(customerList.statusCode).toBe(200)
            expect(customerList.body).not.toBe(null)
        })
    })

    describe('fetch customer details by customer id', () => {
        test('should return customer detail', async () => {
            jest.setTimeout(15000)
            const customerDetail = await request(Base_url).get('/customer/1')
            expect(customerDetail.statusCode).toBe(200)
            expect(customerDetail.body).not.toBe(null)


            const customer = await CustomerModel.findOne({
                where: {
                    id: 1
                }
            })
            expect(customerDetail.body?.company).toContain(customer?.dataValues?.company)
            expect(customerDetail.body?.firstname).toContain(customer?.dataValues?.firstname)
            expect(customerDetail.body?.customer_email).toContain(customer?.dataValues?.customer_email)

            // expect(customerDetail.body).toStrictEqual({
            //     id: 1,
            //     customerType: "business",
            //     contactPerson: "sanjana",
            //     company: "hysus",
            //     firstname: "sanjana",
            //     lastname: "yadav",
            //     customer_email: "sanan103@hysus.com",
            //     skype_name: "sanjana",
            //     designation: "developer",
            //     work_phone: "8658389573195",
            //     mobile_phone: "658389573195",
            //     razorpay_id: null,
            //     stripe_id: "cus_P9guXetPEenxrM",
            //     website: "www.hysus.com",
            //     company_detail: 1,
            //     created_by: null,
            //     updated_by: null,
            //     createdAt: "2023-12-09T10:13:17.000Z",
            //     updatedAt: "2023-12-09T10:13:17.000Z"
            // })
        })

        test('customer details not found', async () => {
            const customerNotFound = await request(Base_url).get('/customer/00')
            expect(customerNotFound.statusCode).toBe(404)
            expect(customerNotFound.body).toStrictEqual({
                "message": "Not found"
            })

        })
    })
})
