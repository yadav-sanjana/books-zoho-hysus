import { stripe } from "../../config/stripe"
import { CartModel, CustomerModel } from "../../models/customer/customerModel"
// import razorpayConfig from '../../config/razorpay';
import axios from 'axios';
import { CompanyModel } from "../../models/user/companyDetailModel";

export const CustomerController = {
    async getAllCustomer(req, res) {
        const customerList = await CustomerModel.findAll({
            include : [
                {
                    model : CompanyModel,
                    required:false,
                    as: "as_company"
                }
            ]
        })

        res.send(customerList)
    },

    async getSingleCustomer(req, res) {
        const id = req.params.id

        const customer = await CustomerModel.findOne({
            where: {
                id
            },
              include : [
                {
                    model : CompanyModel,
                    required:false,
                    as: "as_company"
                }
            ]
        })

        if (!customer) {
            res.status(404).send({
                message: "Not found"
            })
            return
        }

        res.send(customer)
    },

    async createCustomer(req, res) {
        const {
            customerType,
            contactPerson,
            company,
            firstname, lastname,
            customer_email,
            skype_name,
            designation,
            work_phone,
            mobile_phone,
            website } = req.body
        const sqlUID = req.sqlUID

        try {
            const exist = await CustomerModel.findOne({
                where: {
                    customer_email: customer_email
                }
            })

            if (exist) {
                res.status(400).send({
                    message: "email already exists"
                })
                return
            }

            const stripeCustomer = await stripe.customers.create({
                name: firstname,
                email: customer_email
            });

            // const razorpay = axios.create({
            //     baseURL: 'https://api.razorpay.com/v1',
            //     auth: {
            //         username: razorpayConfig.apiKey,
            //         password: razorpayConfig.apiSecret,
            //     },
            // });

            // const razorpayResponse = await razorpay.post('/customers', {
            //     name: firstname,
            //     email: customer_email
            // });

            const customer = await CustomerModel.create({
                customerType,
                contactPerson,
                // razorpay_id: razorpayResponse?.data.id,
                stripe_id: stripeCustomer?.id,
                company,
                firstname,
                lastname,
                customer_email,
                skype_name,
                designation,
                work_phone,
                mobile_phone,
                website,
                created_by: sqlUID
            })

            await CartModel.create({
                customer_id: customer?.dataValues?.id
            })

            res.send(customer)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },

    async updateCustomer(req, res) {
        const id = req.params.id

        try {
            const exists = await CustomerModel.findOne({
                where: {
                    id
                }
            })

            if (!exists) {
                return res.status(404).send({
                    message: "No Customer Found"
                })
            }

            const update_customer = await CustomerModel.update({
                ...req.body

            }, {
                where: {
                    id
                }
            })

            res.send({
                message: "Updated Successfully"
            })
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    }
}