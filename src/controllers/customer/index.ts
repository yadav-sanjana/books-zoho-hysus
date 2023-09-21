import { CustomerModel } from "../../models/customer/customerModel"

export const CustomerController = {
    async getAllCustomer(req, res) {
        const customerList = await CustomerModel.findAll({})

        res.send(customerList)
    }
}