import { SalesPersonModel } from "../../models/salesperson/salesPersonModel"

export const SalePersonController = {
    async addSalesPerson(req, res) {
        try {
            const { email, name, emp_id, contact_number, role } = req.body
            const sqlUID = req.sqlUID
            const exists = await SalesPersonModel.findOne({
                where: {
                    email: email
                }
            })

            if (exists) {
                res.status(400).send({
                    message: "email already exists"
                })
                return
            }
            const person = await SalesPersonModel.create({
                name,
                email,
                emp_id,
                contact_number,
                role,
                created_by: sqlUID
            })

            res.send(person)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },

    async getSalesPerson(req, res) {
        const personList = await SalesPersonModel.findAll({})

        res.send(personList)
    }
}