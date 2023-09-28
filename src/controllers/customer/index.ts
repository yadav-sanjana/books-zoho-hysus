import { CustomerModel } from "../../models/customer/customerModel"

export const CustomerController = {
    async getAllCustomer(req, res) {
        const customerList = await CustomerModel.findAll({})

        res.send(customerList)
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
            const exist = await CustomerModel.findOne({ where: { customer_email } })

            if (exist) {
                res.status(400).send({
                    message: "email already exists"
                })
                return
            }

            const customer = await CustomerModel.create({
                customerType,
                contactPerson,
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

            res.send(customer)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    }
}