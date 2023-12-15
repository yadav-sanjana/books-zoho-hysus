import request from 'supertest';
import { CustomerModel } from '../../src/models/customer/customerModel'
import dotenv from 'dotenv';

dotenv.config();
const Base_url = process.env.BASE_URL
const authToken = process.env.TOKEN

describe('all customer apis', () => {
    const customerDetail = {
        customerType: "business",
        contactPerson: "Ayush",
        company: "hysus",
        username: "ayush",
        customer_email: "ayush.kumar@hysus.com",
        skype_name: "ayush",
        designation: "BD",
        work_phone: "8658389573195",
        mobile_phone: "658389573195",
        website: "www.hysus.com",
        firstname: "Ayush",
        lastname: "Kumar"
    }
    test('created new customer', async () => {
        const newCustomer = await request(Base_url)
            .post('/customer')
            .set('Authorization', `Bearer ${authToken}`)
            .send(customerDetail)

        expect(newCustomer.statusCode).toBe(200)

        const customerRecord = await CustomerModel.findOne({
            where: {
                id: newCustomer?.body?.id
            }
        })
        expect(customerRecord).toBeTruthy()

        expect(newCustomer.body).not.toBe(null)
    })

    test('create existing customer should return bad request', async () => {
        const newCustomer = await request(Base_url)
            .post('/customer')
            .set('Authorization', `Bearer ${authToken}`)
            .send(customerDetail)


        expect(newCustomer.statusCode).toBe(400)
        expect(newCustomer.body).toStrictEqual({
            "message": "email already exists"
        })
    })

    test('create customer without customer_email field should return internal server request', async () => {

        const newCustomer = await request(Base_url)
            .post('/customer')
            .set('Authorization', `Bearer ${authToken}`)
            .send()


        expect(newCustomer.statusCode).toBe(500)
        expect(newCustomer.body).toStrictEqual({
            "message": "WHERE parameter \"customer_email\" has invalid \"undefined\" value"
        })
    })

    test('create customer without firstname,lastname, work_phone require field should return internal server request', async () => {

        const newCustomer = await request(Base_url)
            .post('/customer')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                customer_email: "ayush.kuar@hysus.com"
            })


        expect(newCustomer.statusCode).toBe(500)
        expect(newCustomer.body).toStrictEqual({
            "message": "notNull Violation: customer.firstname cannot be null,\nnotNull Violation: customer.lastname cannot be null,\nnotNull Violation: customer.work_phone cannot be null"
        })
    })

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

        })

        test('customer details not found', async () => {
            const customerNotFound = await request(Base_url).get('/customer/00')
            expect(customerNotFound.statusCode).toBe(404)
            expect(customerNotFound.body).toStrictEqual({
                "message": "Not found"
            })

        })
    })

    describe('update customer details', () => {
        test('updated customer successfully', async () => {
            const updateCustomer = await request(Base_url)
                .patch(`/customer/1`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    customer_email: "ayush.kumar@hysus.com"
                })

            expect(updateCustomer.statusCode).toBe(200)
            expect(updateCustomer.body).toStrictEqual({
                message: "Updated Successfully"
            })

        })

        test('customer not existing ', async() => {
            const updateCustomer =  await request(Base_url)
            .patch(`/customer/00`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                customer_email: "ayush.kumar@hysus.com"
            })

            expect(updateCustomer.statusCode).toBe(404)
            expect(updateCustomer.body).toStrictEqual({
                "message": "No Customer Found"
            })
        })


    })
})
