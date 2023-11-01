import { bucket } from "../../config/fileStorage"
import { extendDateByDays } from "../../middlewares/dateExtend"
import { CartDetailModel, CartModel, CustomerModel } from "../../models/customer/customerModel"
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
                // , {
                //     model: CartModel,
                //     required: false,
                //     as: "invoice_cart",
                //     attributes: ["id", "customer_id"],
                //     include: [
                //         {
                //             model: CartDetailModel,
                //             required: false,
                //             as: "cart_details"
                //         }
                //     ]
                // }
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
                    required: false,
                    as: "as_customer"
                },
                {
                    model: SalesPersonModel,
                    required: false,
                    as: "as_sales_person",
                    attributes: ["id", "email", "name"]
                },
                {
                    model: TermModel,
                    required: false,
                    as: "as_terms",
                    attributes: ["id", "term", "days"]
                },
                // {
                //     model: CartModel,
                //     required: false,
                //     as: "invoice_cart",
                //     attributes: ["id", "customer_id"],
                //     include: [
                //         {
                //             model: CartDetailModel,
                //             required: false,
                //             as: "cart_details"
                //         }
                //     ]
                // }
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
        const sqlUID = req.sqlUID;
        const {
            customer,
            invoice_no,
            order_no,
            sales_person,
            subject,
            customer_notes,
            ATC,
            terms,
        } = req.body;

        const cart = await CartModel.findOne({
            where: {
                customer_id: customer
            }
        })

        const cart_detail = await CartDetailModel.findAll({
            where: {
                cart_id: cart?.dataValues?.id
            }
        })

        const valuesAmount = cart_detail.map((amt) => {
            return amt.dataValues.amount
        })

        const amount = valuesAmount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        const termId = Number(terms);
        const invoice_date: Date = new Date(req.body.invoice_date);
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        if (req.file) {
            const filename = Date.now() + '_' + req.file.originalname;
            const file = bucket.file(filename);

            try {
                const fileStream = file.createWriteStream({
                    metadata: {
                        contentType: req.file.mimetype,
                    },
                });

                fileStream.on('error', (err) => {
                    console.error(err);
                    res.status(500).send('Error uploading file: ' + err.message);
                });

                fileStream.on('finish', async () => {
                    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
                    console.log('File uploaded. URL:', publicUrl);

                    // Here, you can save the publicUrl to your database
                    // For example, using a database model like Mongoose or Sequelize

                    // Respond with the public URL
                    res.status(200).json({ url: publicUrl });
                });

                // fileStream.end(req.file.buffer);
            } catch (err) {
                console.log(err.message);
                return
            }

        }
        try {
            const termExists = await TermModel.findOne({
                where: {
                    id: termId,
                },
            });

            if (!termExists) {
                res.status(400).send({
                    message: "Please select a valid term",
                });
                return;
            }

            const termsDay = termExists?.dataValues?.days;
            const due_date = extendDateByDays(invoice_date, termsDay);

            const invoice = await InvoiceModel.create({
                customer,
                invoice_no,
                order_no,
                invoice_date,
                sales_person,
                subject,
                customer_notes,
                ATC,
                file: "publicUrl", // Use the public URL here
                terms,
                cart_id: cart?.dataValues?.id,
                due_date,
                created_by: sqlUID,
            });

            res.status(200).send(invoice);



        } catch (error) {
            res.status(500).send({
                error: error.message,
            });
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
    },
    async getTermByID(req, res) {
        const id = req.params.id
        const terms = await TermModel.findOne({
            where: {
                id
            }
        })

        if (!terms) {
            res.status(404).send({
                message: "No term found"
            })

            return
        }

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

            const customer_id = req.params.id

            const cart_exists = await CartModel.findOne({
                where: {
                    customer_id
                }
            })
            const itemAdd = await CartDetailModel.create({
                item,
                quantity,
                rate,
                amount,
                cart_id: cart_exists?.dataValues?.id
            })

            if (cart_exists) {
                const cart_detail = await CartDetailModel.findAll({
                    where: {
                        cart_id: cart_exists?.dataValues?.id
                    }
                })

                const valuesAmount = cart_detail.map((amt) => {
                    return amt.dataValues.amount
                })

                const totalAmount = valuesAmount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

                await CartModel.update({
                    total_amount: totalAmount
                }, {
                    where: {
                        id: cart_exists?.dataValues?.id
                    }
                })
            }

            res.send(itemAdd)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },

    async updateCartItem(req, res) {
        try {

            const id = req.params.id
            const exists = await CartDetailModel.findOne({
                where: {
                    id
                }
            })
            if (!exists) {
                res.status(404).send({
                    message: "No such item found"
                })
            }

            const { item, quantity, rate, amount } = req.body
            const updatedItem = await CartDetailModel.update({
                item,
                quantity,
                rate,
                amount
            }, {
                where: {
                    id
                }
            })

            const cart_detail = await CartDetailModel.findAll({
                where: {
                    cart_id: exists?.dataValues?.cart_id
                }
            })


            const valuesAmount = cart_detail.map((amt) => {
                return amt.dataValues.amount
            })

            const totalAmount = valuesAmount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

            await CartModel.update({
                total_amount: totalAmount
            }, {
                where: {
                    id: exists?.dataValues?.cart_id
                }
            })


            res.send({
                message: "Updated successfully"
            })

        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    async fetchItems(req, res) {
        try {
            const customer_id = req.params.id

            const cart = await CartModel.findOne({
                where: {
                    customer_id
                }
            })

            const itemList = await CartModel.findAll({
                where: {
                    customer_id
                },
                attributes: ["id", "customer_id", "discount", "tax", "total_amount", "payableAmount"],
                include: [
                    {
                        model: CartDetailModel,
                        required: false,
                        as: "cart_details",
                    }
                ]
            })

            res.send(itemList)
        } catch (err) {
            res.status(500).send({
                error: err.message
            })
        }
    },
    async fetchSingleItem(req, res) {
        try {

            const id = req.params.item_id
            const item = await CartDetailModel.findOne({
                where: {
                    id
                }
            })

            res.send(item)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },

    async updateCart(req, res) {
        try {
            const {
                discount,
                tax,
                total_amount,
                payableAmount
            } = req.body

            const customer_id = req.params.id

            const updateCart = await CartModel.update({
                discount,
                tax,
                total_amount,
                payableAmount
            }, {
                where: {
                    customer_id
                }
            })

            res.send(updateCart)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }

    }
}