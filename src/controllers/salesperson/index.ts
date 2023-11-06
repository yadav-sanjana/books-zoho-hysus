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
    },
    async getSalesPersonById(req, res) {
        const id = req.params.id
        const person = await SalesPersonModel.findOne({
            where : {
                id
            }
        })

        if(!person){
            res.status(404).send({
                message : "Sales Person not Found"
            })
            return
        }

        res.send(person)
    },
    async updateSalesPerson(req, res) {
        try {

            const id = req.params.id
            const admin_id = req.sqlUID

            const { email, name, contact_number } = req.body

            const exists = await SalesPersonModel.findOne({
                where: {
                    id
                }
            })

            if (!exists) {
                res.status(404).send({
                    message: "Sales Person not exists"
                })

                return
            }

            const updatePerson = await SalesPersonModel.update({
                email,
                name,
                contact_number,
                updated_by: admin_id
            }, {
                where: {
                    id
                }
            })

            res.send({
                message : "Updated Successfully"
            })

        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    }
}