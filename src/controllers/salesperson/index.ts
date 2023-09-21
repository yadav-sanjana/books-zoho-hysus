import { SalesPersonModel } from "../../models/salesperson/salesPersonModel"

export const SalePersonController = {
    async addSalesPerson(req, res) {
        try {
            const { email, name } = req.body
        const sqlUID = req.sqlUID
        const exists = await SalesPersonModel.findOne({
            where: { 
                email : email
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
            created_by: sqlUID
        })

        res.send(person)
        } catch (error) {
            res.status(500).send({
                error : error.message
            })
        }
    },

    async getSalesPerson(req, res) {
        const personList = await SalesPersonModel.findAll({})

        res.send(personList)
    }
}