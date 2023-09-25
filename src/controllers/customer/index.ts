import { CustomerModel } from "../../models/customer/customerModel"

export const CustomerController = {
    async getAllCustomer(req, res) {
        const customerList = await CustomerModel.findAll({})

        res.send(customerList)
    },

    async createCustomer(req, res) {
        const { email } = req.body
        const sqlUID = req.sqlUID

        try {
            const exist = await CustomerModel.findOne({ where: { email } })

            if (exist) {
                res.status(400).send({
                    message: "email already exists"
                })
                return
            }

            const customer = await CustomerModel.create({
                email,
                created_by: sqlUID
            })
            
            res.send(customer)
        } catch (error) {
            res.status(500).send({
                error: "Internal Server Error"
            })
        }
    }
}