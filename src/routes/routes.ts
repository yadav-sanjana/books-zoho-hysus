import express from 'express'
import { UserController } from '../controllers/user'
import { CustomerController } from '../controllers/customer'
import { auth } from '../middlewares/auth'
import { SalePersonController } from '../controllers/salesperson'
import { InvoiceController, ItemController, TermController } from '../controllers/invoice'
import { singleUpload } from '../config/fileStorage'

const router = express.Router()

//user
router.get('/user', UserController.getUser)
router.get('/user/:email', UserController.getUserToken)
router.post('/user', auth, UserController.createUser)

//customer
router.get('/customer', CustomerController.getAllCustomer)
router.post('/customer', CustomerController.createCustomer)

//salesperson
router.get('/sales-person', SalePersonController.getSalesPerson)
router.post('/sales-person', auth, SalePersonController.addSalesPerson)

//terms
router.get('/terms', TermController.allTerms)
router.post('/terms', auth, TermController.createTerm)

//invoice
router.get('/invoice', InvoiceController.getAllInvoiceList)
router.get('/invoice/:id', InvoiceController.getInvoiceById)
router.post('/invoice', auth, singleUpload, InvoiceController.createInvoice)

router.post('/add-item/:id', ItemController.addItem)
router.patch('/add-item/:id', ItemController.updateCartItem)
router.get('/item/:id' , ItemController.fetchItems)

export default router
