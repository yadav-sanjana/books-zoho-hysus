import { extendDateByDays } from "../../middlewares/dateExtend"
import { CustomerModel } from "../../models/customer/customerModel"
import { InvoiceModel, ItemModel, TermModel } from "../../models/invoice/invoiceModel"
import { SalesPersonModel } from "../../models/salesperson/salesPersonModel"

export const InvoiceController = {
    async getAllInvoiceList(req, res) {
        const invoiceList = await InvoiceModel.findAll({
            include: [
                {
                    model: CustomerModel,
                    required: true,
                    as: "as_customer"
                },
                {
                    model: SalesPersonModel,
                    required: true,
                    as: "as_sales_person",
                    attributes: ["id", "email", "name"]
                },
                {
                    model: TermModel,
                    required: false,
                    as: "as_terms",
                    attributes: ["id", "term", "days"]
                }
            ]
        })

        res.send(invoiceList)
    },

    async getInvoiceById(req, res) {
        const id = req.params.id
        const invoice = await InvoiceModel.findOne({
            where: {
                id
            },
            include: [
                {
                    model: CustomerModel,
                    required: true,
                    as: "as_customer"
                },
                {
                    model: SalesPersonModel,
                    required: true,
                    as: "as_sales_person",
                    attributes: ["id", "email", "name"]
                },
                {
                    model: TermModel,
                    required: false,
                    as: "as_terms",
                    attributes: ["id", "term", "days"]
                }
            ]
        })
        if (!invoice) {
            res.status(404).send({
                message: "Invoice not found"
            })
            return
        }

        const items = await ItemModel.findAll({
            where: {
                invoice_no: id
            }
        })

        res.send({
            invoice: invoice,
            details: items
        })
    },

    async createInvoice(req, res) {

        const sqlUID = req.sqlUID
        const { customer,
            invoice_no,
            order_no,
            sales_person,
            subject,
            customer_notes,
            ATC,
            file,
            terms
        } = req.body
        // const file = req.file
        const invoice_date: Date = new Date(req.body.invoice_date)
        try {
            const termExists = await TermModel.findOne({
                where: {
                    id: terms
                }
            })
            if (!termExists) {
                res.status(400).send({
                    message: "please select valid term"
                })
                return
            }
            const termsDay = termExists?.dataValues?.days
            const due_date = extendDateByDays(invoice_date, termsDay)

            const invoice = await InvoiceModel.create({
                customer,
                invoice_no,
                order_no,
                invoice_date,
                sales_person,
                subject,
                customer_notes,
                ATC,
                file,
                terms,
                due_date,
                created_by: sqlUID
            })

            res.send(invoice)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }

    }
}

export const TermController = {
    async createTerm(req, res) {
        try {
            const { term, days } = req.body

            const terms = await TermModel.create({
                term, days,
                created_by: req.sqlUID
            })

            res.send(terms)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    async allTerms(req, res) {
        const terms = await TermModel.findAll({})

        res.send(terms)
    }
}

export const ItemController = {
    async addItem(req, res) {
        try {
            const { item,
                quantity,
                rate,
                amount,
            } = req.body

            const items = await ItemModel.create({
                item,
                quantity,
                rate,
                amount,
                invoice_no: req.params.id
            })
            res.send(items)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    }
}